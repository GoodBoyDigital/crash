"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    /*
      * @class Vector
      * @constructor
      * @param x {Number} position of the point
      * @param y {Number} position of the point
      */
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;
    }

    Vector.create = function create(x, y) {
        return new Vector(x, y);
    };

    Vector.clone = function clone(v) {
        return new Vector(v.x, v.y);
    };

    Vector.add = function add(o, a, b) {
        o.x = a.x + b.x;
        o.y = a.y + b.y;

        return o;
    };

    Vector.copy = function copy(o, a) {
        o.x = a.x;
        o.y = a.y;

        return o;
    };

    Vector.sub = function sub(o, a, b) {
        o.x = a.x - b.x;
        o.y = a.y - b.y;

        return o;
    };

    Vector.invert = function invert(o, v) {
        o.x = v.x * -1;
        o.y = v.y * -1;

        return o;
    };

    Vector.mul = function mul(o, a, s) {
        o.x = v.x * s;
        o.y = v.y * s;

        return o;
    };

    Vector.dot = function dot(a, b) {
        return a.x * b.x + a.y * b.y;
    };

    Vector.len = function len(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    };

    Vector.lengthSq = function lengthSq(a) {
        return a.x * a.x + a.y * a.y;
    };

    Vector.normalise = function normalise(o, a) {
        var scale = Math.sqrt(a.x * a.x + a.y * a.y);

        o.x = a.x / scale;
        o.y = a.y / scale;

        return o;
    };

    Vector.distance = function distance(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
    };

    Vector.distanceSq = function distanceSq(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return dx * dx + dy * dy;
    };

    Vector.set = function set(v, x, y) {
        v.x = x || 0;
        v.y = y || (y !== 0 ? v.x : 0);

        return v;
    };

    Vector.lerp = function lerp(o, a, b, ratio) {
        o.x = a.x + (b.x - a.x) * ratio;
        o.y = a.y + (b.y - a.y) * ratio;

        return o;
    };

    Vector.rad = function rad(v) {
        return Math.atan2(v.x, v.y);
    };

    Vector.equels = function equels(a, b) {
        return a.x === b.x && a.y === b.y;
    };

    Vector.rotate = function rotate(o, a, angle) {
        var x = a.x;
        var y = a.y;

        o.x = x * Math.cos(angle) - y * Math.sin(angle);
        o.y = x * Math.sin(angle) + y * Math.cos(angle);
    };

    Vector.project = function project(o, a, b) {
        var dp = a.x * b.x + a.y * b.y;
        o.x = dp / (b.x * b.x + b.y * b.y) * b.x;
        o.y = dp / (b.x * b.x + b.y * b.y) * b.y;

        return o;
    };

    Vector.projectPoint = function projectPoint(o, p, a) {
        /*
        var positionLine = new Vector(0,0);
        var projectedPoint = Vector.project(point.clone().minus(positionLine), directionLine);
         return projectedPoint.clone().plus(positionLine);
         */
    };

    return Vector;
}();

exports.default = Vector;
//# sourceMappingURL=Vector.js.map