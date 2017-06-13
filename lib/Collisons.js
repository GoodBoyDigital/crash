"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collisions = function () {
    /*
      * @class Vector
      * @constructor
      * @param x {Number} position of the point
      * @param y {Number} position of the point
      */
    function Collisions(x, y) {
        _classCallCheck(this, Collisions);
    }

    _createClass(Collisions, [{
        key: "aabbVaabb",
        value: function aabbVaabb(aabb1, aabb2) {
            return aabb1.upper.x - aabb2.lower.x > 0;
        }
    }, {
        key: "circleVrectangle",
        value: function circleVrectangle(circle, rectangle) {}
    }]);

    return Collisions;
}();

exports.default = Collisions;
//# sourceMappingURL=Collisons.js.map