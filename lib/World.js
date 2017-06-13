'use strict';

exports.__esModule = true;

var _Group = require('./utils/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _NarrowPhase = require('./NarrowPhase');

var _NarrowPhase2 = _interopRequireDefault(_NarrowPhase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //  var CollisionTest = require('../Group');

var World = function () {
    function World() {
        _classCallCheck(this, World);

        // on hit test against.. platforms

        this.staticBodies = this[_Body2.default.STATIC] = new _Group2.default();
        this.dynamicBodies = this[_Body2.default.DYNAMIC] = new _Group2.default();
        this.bodies = new _Group2.default();

        this.collisions = [];
        this.narrowPhase = new _NarrowPhase2.default();

        this.dt = 1;

        this.collisionKeys = {};

        this.DEBUG = false;
    }

    World.prototype.add = function add(body) {
        this[body.type].add(body);
        this.bodies.add(body);
    };

    World.prototype.remove = function remove(body) {
        this[body.type].remove(body);
        this.bodies.remove(body);
    };

    World.prototype.update = function update() {

        //TODO broadphase

        var collisions = this.getCollisions();

        console.log(collisions);

        for (var i = 0; i < this.dynamicItems.children.length; i++) {
            this.dynamicItems.children[i].body.update(this.dt);
        };

        //this.narrowPhase.hitTest(collisions);
        // };

    };

    World.prototype.reset = function reset() {
        this.staticBodies.empty();
        this.dynamicBodies.empty();
        this.bodies.empty();

        this.collisions.length = 0;

        this.narrowPhase.reset();
    };

    World.prototype.getKey = function getKey(a, b) {
        return (a << 12) + b;
    };

    World.prototype.registerCollison = function registerCollison(type1, type2) {
        this.collisionKeys[this.getKey(type1, type2)] = true;
        this.collisionKeys[this.getKey(type2, type1)] = true;
    };

    World.prototype.getCollisions = function getCollisions() {
        this.collisions.length = 0;

        var size = 0;

        //SAP!
        var list = this.bodies.children;
        this.sortAxisList(list);

        for (var i = 0; i < list.length; i++) {
            var body1 = list[i];
            var newItemLeft = body1.position.x + body1.boundingBox.upper.x;

            for (var j = i + 1; j < list.length; j++) {
                var body2 = list[j];

                var currentItemRight = body2.body.position.x + body2.boundingBox.lower.x; // - 5;

                if (newItemLeft <= currentItemRight) {
                    break;
                } else {
                    var canCollide = true;
                    var key = this.getKey(item2.type, item1.type
                    //TODO items that are the same cannot collide..

                    );if (!this.collisionKeys[key]) //platform.type === item.type && !item.collideWithSelf)
                        {
                            canCollide = false;
                        } else {
                        if (!body2.canCollide || !body1.canCollide) {
                            canCollide = false;
                        }
                    }

                    if (canCollide) {
                        this.collisions.push(body1, body2);
                    }
                }
            }
        };

        // finallly hit tes the bounds..


        return this.collisions;
    };

    World.prototype.sortAxisList = function sortAxisList(a) {
        for (var i = 1, l = a.length; i < l; i++) {
            var v = a[i];
            for (var j = i - 1; j >= 0; j--) {
                var a2 = a[j];

                if (a2.boundingBox.lower.x + a2.position.x <= v.boundingBox.lower.x + v.position.x) {
                    break;
                }

                a[j + 1] = a[j];
            }

            a[j + 1] = v;
        }

        return a;
    };

    return World;
}();

exports.default = World;
//# sourceMappingURL=World.js.map