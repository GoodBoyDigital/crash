'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('./AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _ContactData = require('./ContactData');

var _ContactData2 = _interopRequireDefault(_ContactData);

var _Shape = require('./shapes/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _circleVcircle = require('./collision/circleVcircle');

var _circleVcircle2 = _interopRequireDefault(_circleVcircle);

var _rectangleVcircle = require('./collision/rectangleVcircle');

var _rectangleVcircle2 = _interopRequireDefault(_rectangleVcircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tempAABB = new _AABB2.default();
var tempAABB2 = new _AABB2.default();

var NarrowPhase = function () {
    function NarrowPhase() {
        _classCallCheck(this, NarrowPhase);

        this.collisionMap = {};

        this.pool = [];

        this.tickId = 0;

        this.currentCollisions = [];
        this.contactPool = [];

        this.collisionDatas = [];

        this[_Shape2.default.CIRCLE | _Shape2.default.CIRCLE] = _circleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.RECTANGLE] = this.rectangleVrectangle;
        this[_Shape2.default.LINE | _Shape2.default.LINE] = this.lineVline;
        this[_Shape2.default.RECTANGLE | _Shape2.default.CIRCLE] = _rectangleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.LINE] = this.rectangleVline;
        this[_Shape2.default.CIRCLE | _Shape2.default.LINE] = this.circleVline;
    }

    _createClass(NarrowPhase, [{
        key: 'collide',
        value: function collide(collisions) {
            this.tickId++;

            //TODO OPTIMISE THIS SHIZ
            //for(var j = 0; j < 1; j++)
            //{
            for (var i = 0; i < collisions.length; i += 2) {
                // first aabb checks..

                var bounds = body1.globalBounds(collisions[i]);
                var bounds2 = body2.globalBounds(collisions[i + 1]);

                if (this.aabbVaabb(bounds, bounds2)) {
                    for (var i = 0; i < body1.shapes.length; i++) {
                        var shape1 = body1.shapes[i];

                        for (var j = 0; j < body2.shapes.length; j++) {
                            var shape2 = body2.shapes[j];

                            if (shape1.type < shape2.type) {
                                this[shape1.type | shape2.type](body1, shape1, body2, shape2, this.collisionSuccess, this.collisionsFail);
                            } else {
                                this[shape2.type | shape1.type](body2, shape2, body1, shape1, this.collisionSuccess, this.collisionsFail);
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
        }
    }, {
        key: 'collisionSuccess',
        value: function collisionSuccess(body1, shape1, body2, shape2, penetration, projection) {
            var key;

            if (shape1.UID > shape2.UID) {
                key = (shape2.UID << 12) + shape1.UID; //shape1.UID + ":"+ shape2.UID;
            } else {
                key = (shape1.UID << 12) + shape2.UID; //shape1.UID + ":"+ object2.UID;
            }

            var contactData = this.collisionMap[key];

            if (contactData) {
                contactData.penetration = penetration;
                contactData.projection = projection;
                contactData._tickId = this.tickId;
            } else {
                contactData = this.pool.pop();

                if (!contactData) {
                    contactData = new CrashData(object1, object2, penetration, projection, false);
                } else {
                    contactData.object1 = object1;
                    contactData.object2 = object2;
                    contactData.penetration = penetration;
                    contactData.projection = projection;
                    contactData.ignore = false;
                }

                contactData._key = key;
                contactData._tickId = this.tickId;

                this.collisionMap[key] = contactData;

                this.currentCollisions.push(contactData);
            }
        }
    }, {
        key: 'collisionsFail',
        value: function collisionsFail(body1, circle1, body2, circle2) {
            // no more collision!
        }
    }, {
        key: 'aabbVaabb',
        value: function aabbVaabb(aabb1, aabb2) {
            var lower1 = aabb1.lower;
            var upper1 = aabb1.upper;
            var lower2 = aabb2.lower;
            var upper2 = aabb2.upper;

            return (lower2.x <= upper1.x && upper1.x <= upper2.x || lower1.x <= upper2.x && upper2.x <= upper1.x) && (lower2.y <= upper1.y && upper1.y <= upper2.y || lower1.y <= upper2.y && upper2.y <= upper1.y);
        }
    }, {
        key: 'endCollision',
        value: function endCollision(collisionData) {

            var key = collisionData._key;

            var collisonData = this.collisions[key];

            if (collisonData) {
                // end collision..
                /*
                            if(collisionData.object2 === collisionData.object1.body.currentSurface)
                            {
                                collisionData.object1.onGround = false;
                                collisionData.object1.body.currentSurface = null;
                            }
                            else if(collisionData.object1 === collisionData.object2.body.currentSurface)
                            {
                                collisionData.object2.onGround = false;
                                collisionData.object2.body.currentSurface = null;
                            }
                */
                this.pool.push(collisonData);
                this.collisions[key] = null;
            }

            //TODO think about this!
            if (collisionData.object1.world) {

                // if(collisionData.object1.onCollideEnd)collisionData.object1.onCollideEnd(collisonData);
                // if(collisionData.object2.onCollideEnd)collisionData.object2.onCollideEnd(collisonData);
            }

            return collisonData;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.collisions = {};
            this.tickId = 0;

            this.currentCollisions = [];
        }
    }]);

    return NarrowPhase;
}();

exports.default = NarrowPhase;
//# sourceMappingURL=NarrowPhase.js.map