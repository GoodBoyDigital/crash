"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(Vector, null, [{
        key: "create",
        value: function create(x, y) {
            return new Vector(x, y);
        }
    }, {
        key: "clone",
        value: function clone(v) {
            return new Vector(v.x, v.y);
        }
    }, {
        key: "add",
        value: function add(o, a, b) {
            o.x = a.x + b.x;
            o.y = a.y + b.y;

            return o;
        }
    }, {
        key: "sub",
        value: function sub(o, a, b) {
            o.x = a.x - b.x;
            o.y = a.y - b.y;

            return o;
        }
    }, {
        key: "invert",
        value: function invert(o, v) {
            o.x = v.x * -1;
            o.y = v.y * -1;

            return o;
        }
    }, {
        key: "mul",
        value: function mul(o, a, s) {
            o.x = v.x * s;
            o.y = v.y * s;

            return o;
        }
    }, {
        key: "dot",
        value: function dot(a, b) {
            return a.x * b.x + a.y * b.y;
        }
    }, {
        key: "length",
        value: function length(a) {
            return Math.sqrt(a.x * a.x + a.y * a.y);
        }
    }, {
        key: "lengthSq",
        value: function lengthSq(a) {
            return a.x * a.x + a.y * a.y;
        }
    }, {
        key: "normalise",
        value: function normalise(o, a) {
            var scale = Math.sqrt(a.x * a.x + a.y * a.y);

            o.x = a.x / scale;
            o.y = a.y / scale;

            return o;
        }
    }, {
        key: "distance",
        value: function distance(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: "distanceSq",
        value: function distanceSq(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;

            return dx * dx + dy * dy;
        }
    }, {
        key: "set",
        value: function set(v, x, y) {
            v.x = x || 0;
            v.y = y || (y !== 0 ? v.x : 0);

            return v;
        }
    }, {
        key: "lerp",
        value: function lerp(o, a, b, ratio) {
            o.x = a.x + (b.x - a.x) * ratio;
            o.y = a.y + (b.y - a.y) * ratio;

            return o;
        }
    }, {
        key: "rad",
        value: function rad(v) {
            return Math.atan2(v.x, v.y);
        }
    }, {
        key: "equels",
        value: function equels(a, b) {
            return a.x === b.x && a.y === b.y;
        }
    }, {
        key: "rotate",
        value: function rotate(o, a, angle) {
            var x = a.x;
            var y = a.y;

            o.x = x * Math.cos(angle) - y * Math.sin(angle);
            o.y = x * Math.sin(angle) + y * Math.cos(angle);
        }
    }, {
        key: "project",
        value: function project(o, a, b) {
            var dp = a.x * b.x + a.y * b.y;
            o.x = dp / (b.x * b.x + b.y * b.y) * b.x;
            o.y = dp / (b.x * b.x + b.y * b.y) * b.y;

            return o;
        }
    }, {
        key: "projectPoint",
        value: function projectPoint(o, p, a) {
            /*
            var positionLine = new Vector(0,0);
            var projectedPoint = Vector.project(point.clone().minus(positionLine), directionLine);
             return projectedPoint.clone().plus(positionLine);
             */
        }
    }]);

    return Vector;
}();

exports.default = Vector;
//# sourceMappingURL=Vector.js.map