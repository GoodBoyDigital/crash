'use strict';

exports.__esModule = true;

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('./AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _ContactData = require('./ContactData');

var _ContactData2 = _interopRequireDefault(_ContactData);

var _Solver = require('./Solver');

var _Solver2 = _interopRequireDefault(_Solver);

var _Shape = require('./shapes/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _circleVcircle = require('./collision/circleVcircle');

var _circleVcircle2 = _interopRequireDefault(_circleVcircle);

var _rectangleVcircle = require('./collision/rectangleVcircle');

var _rectangleVcircle2 = _interopRequireDefault(_rectangleVcircle);

var _rectangleVrectangle = require('./collision/rectangleVrectangle');

var _rectangleVrectangle2 = _interopRequireDefault(_rectangleVrectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tempAABB = new _AABB2.default();
var tempAABB2 = new _AABB2.default();

var NarrowPhase = function () {
    function NarrowPhase(world) {
        _classCallCheck(this, NarrowPhase);

        this.world = world;

        this.collisionMap = {};

        this.pool = [];

        this.tickId = 0;

        this.currentCollisions = [];
        this.contactPool = [];

        this.collisionDatas = [];

        this[_Shape2.default.CIRCLE | _Shape2.default.CIRCLE] = _circleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.RECTANGLE] = _rectangleVrectangle2.default;
        this[_Shape2.default.LINE | _Shape2.default.LINE] = this.lineVline;
        this[_Shape2.default.RECTANGLE | _Shape2.default.CIRCLE] = _rectangleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.LINE] = this.rectangleVline;
        this[_Shape2.default.CIRCLE | _Shape2.default.LINE] = this.circleVline;

        this.collisionSuccess = this.collisionSuccess.bind(this);
        this.collisionFail = this.collisionFail.bind(this);

        this.solver = new _Solver2.default();
    }

    NarrowPhase.prototype.collide = function collide(collisions) {
        this.tickId++;

        //TODO OPTIMISE THIS SHIZ
        //for(var j = 0; j < 1; j++)
        //{
        for (var i = 0; i < collisions.length; i += 2) {
            // first aabb checks..

            var body1 = collisions[i];
            var body2 = collisions[i + 1];

            var bounds = body1.globalBounds(tempAABB);
            var bounds2 = body2.globalBounds(tempAABB2);

            if (this.aabbVaabb(bounds, bounds2)) {
                for (var j = 0; j < body1.shapes.length; j++) {
                    var shape1 = body1.shapes[j];

                    for (var k = 0; k < body2.shapes.length; k++) {
                        var shape2 = body2.shapes[k];

                        if (shape1.type < shape2.type) {
                            this[shape1.type | shape2.type](body1, shape1, body2, shape2, this.collisionSuccess, this.collisionFail);
                        } else {
                            this[shape2.type | shape1.type](body2, shape2, body1, shape1, this.collisionSuccess, this.collisionFail);
                        }
                    }
                }
            }
        }

        // check for dead collisons..
        for (var i = 0; i < this.currentCollisions.length; i++) {

            var collisonData = this.currentCollisions[i];

            if (collisonData._tickId !== this.tickId) {
                // ended!
                this.endCollision(collisonData);
                this.currentCollisions.splice(i, 1);
                i--;
            }
        };

        // solve current collisions..
        this.solver.solve(this.currentCollisions);
    };

    NarrowPhase.prototype.collisionSuccess = function collisionSuccess(body1, shape1, body2, shape2, penetration, projection) {
        var key;

        if (shape1.id > shape2.id) {
            key = (shape2.id << 12) + shape1.id; //shape1.id + ":"+ shape2.id;
        } else {
            key = (shape1.id << 12) + shape2.id; //shape1.UID + ":"+ object2.UID;
        }

        var contactData = this.collisionMap[key];

        if (contactData) {
            contactData.penetration = penetration;
            contactData.projection = projection;
            contactData._tickId = this.tickId;
        } else {
            console.log("collision begin");
            contactData = this.pool.pop();

            if (!contactData) {
                contactData = new _ContactData2.default(body1, shape1, body2, shape2, penetration, projection, false);
            } else {
                contactData.body1 = body1;
                contactData.shape1 = shape1;
                contactData.body2 = body2;
                contactData.shape2 = shape2;

                contactData.penetration = penetration;
                contactData.projection = projection;
                contactData.ignore = false;
            }

            contactData._key = key;
            contactData._tickId = this.tickId;

            this.world.onCollideBegin.dispatch(contactData);

            this.collisionMap[key] = contactData;

            if (!contactData.ignore && !shape1.sensor && !shape2.sensor) {
                this.currentCollisions.push(contactData);
            }
        }
    };

    NarrowPhase.prototype.collisionFail = function collisionFail(body1, circle1, body2, circle2) {
        // no more collision!
    };

    NarrowPhase.prototype.aabbVaabb = function aabbVaabb(aabb1, aabb2) {
        var lower1 = aabb1.lower;
        var upper1 = aabb1.upper;
        var lower2 = aabb2.lower;
        var upper2 = aabb2.upper;

        return (lower2.x <= upper1.x && upper1.x <= upper2.x || lower1.x <= upper2.x && upper2.x <= upper1.x) && (lower2.y <= upper1.y && upper1.y <= upper2.y || lower1.y <= upper2.y && upper2.y <= upper1.y);
    };

    NarrowPhase.prototype.endCollision = function endCollision(collisionData) {

        var key = collisionData._key;

        var contactData = this.collisionMap[key];

        if (contactData) {
            console.log("collision end");

            if (!contactData.ignore) {
                this.world.onCollideEnd.dispatch(contactData);
            }

            this.contactPool.push(contactData);
            this.collisionMap[key] = null;
        }

        //TODO think about this!
        // if(collisionData.object1.world)
        {

            // if(collisionData.object1.onCollideEnd)collisionData.object1.onCollideEnd(collisonData);
            // if(collisionData.object2.onCollideEnd)collisionData.object2.onCollideEnd(collisonData);
        }

        return collisionData;
    };

    NarrowPhase.prototype.reset = function reset() {
        this.collisionMap = {};
        this.tickId = 0;

        this.currentCollisions = [];
    };

    return NarrowPhase;
}();

exports.default = NarrowPhase;
//# sourceMappingURL=NarrowPhase.js.map