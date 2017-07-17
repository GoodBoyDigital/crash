'use strict';

exports.__esModule = true;

var _Group = require('./utils/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _NarrowPhase = require('./NarrowPhase');

var _NarrowPhase2 = _interopRequireDefault(_NarrowPhase);

var _miniSignals = require('mini-signals');

var _miniSignals2 = _interopRequireDefault(_miniSignals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //  var CollisionTest = require('../Group');

var World = function () {
    function World() {
        _classCallCheck(this, World);

        // on hit test against.. platforms
        this.onCollideBegin = new _miniSignals2.default();
        this.onCollideEnd = new _miniSignals2.default();

        this.staticBodies = this[_Body2.default.STATIC] = new _Group2.default();
        this.dynamicBodies = this[_Body2.default.DYNAMIC] = new _Group2.default();
        this.bodies = new _Group2.default();

        this.collisions = [];
        this.narrowPhase = new _NarrowPhase2.default(this);

        this.dt = 1;

        this.collisionKeys = {};

        this.DEBUG = false;

        this.registerCollison(0, 0);
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
        //TODO seperate to a broadphase

        for (var i = 0; i < this.dynamicBodies.children.length; i++) {
            this.dynamicBodies.children[i].update(this.dt);
        };

        var collisions = this.getCollisions();
        this.narrowPhase.collide(collisions);
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

    World.prototype.updateBounds = function updateBounds() {
        // TODO no need to update static!
        var list = this.bodies.children;

        for (var i = 0; i < list.length; i++) {
            list[i].updateBounds();
        }
    };

    World.prototype.getCollisions = function getCollisions() {
        this.collisions.length = 0;

        var size = 0;

        this.updateBounds();

        //SAP!
        var list = this.bodies.children;

        this.sortAxisList(list);

        for (var i = 0; i < list.length; i++) {
            var body1 = list[i];
            var newItemLeft = body1.position.x + body1.boundingBox.upper.x;
            for (var j = i + 1; j < list.length; j++) {
                var body2 = list[j];

                var currentItemRight = body2.position.x + body2.boundingBox.lower.x; // - 5;

                if (newItemLeft <= currentItemRight) {
                    break;
                } else {
                    if (this.canCollide(body1, body2)) {
                        this.collisions.push(body1, body2);
                    }
                }
            }
        };

        // finallly hit tes the bounds..

        return this.collisions;
    };

    World.prototype.canCollide = function canCollide(body1, body2) {
        if ((body1.type | body2.type) !== (_Body2.default.STATIC | _Body2.default.STATIC)) {
            if (body2.canCollide && body1.canCollide) {
                var key = this.getKey(body2.collisionMask, body1.collisionMask);

                if (this.collisionKeys[key]) {
                    return true;
                }
            }
        }

        return false;
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