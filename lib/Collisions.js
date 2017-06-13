'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AABB = require('./AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

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

var Collisions = function () {
    /*
     * @class Vector
     * @constructor
     * @param x {Number} position of the point
     * @param y {Number} position of the point
     */
    function Collisions(x, y) {
        _classCallCheck(this, Collisions);

        this.collisionMap = {};

        //(object2.UID << 12) + object1.UID;

        this[_Shape2.default.CIRCLE | _Shape2.default.CIRCLE] = _circleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.RECTANGLE] = this.rectangleVrectangle;
        this[_Shape2.default.LINE | _Shape2.default.LINE] = this.lineVline;
        this[_Shape2.default.RECTANGLE | _Shape2.default.CIRCLE] = _rectangleVcircle2.default;
        this[_Shape2.default.RECTANGLE | _Shape2.default.LINE] = this.rectangleVline;
        this[_Shape2.default.CIRCLE | _Shape2.default.LINE] = this.circleVline;

        this.contacts = [];
    }

    _createClass(Collisions, [{
        key: 'collide',
        value: function collide(body1, body2) {
            var bounds = body1.globalBounds(tempAABB);
            var bounds2 = body2.globalBounds(tempAABB2);

            if (this.aabbVaabb(bounds, bounds2)) {
                // hit test
                // bounding boxes have collided

                for (var i = 0; i < body1.shapes.length; i++) {
                    var shape1 = body1.shapes[i];

                    for (var j = 0; j < body2.shapes.length; j++) {
                        var shape2 = body2.shapes[j];

                        if (shape1.type < shape2.type) {
                            this[shape1.type | shape2.type](body1, shape1, body2, shape2);
                        } else {
                            this[shape2.type | shape1.type](body2, shape2, body1, shape1);
                        }
                    }
                }
            } else {}
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
        key: 'rectangleVrectangle',
        value: function rectangleVrectangle(rect1, rect2) {}
    }, {
        key: 'lineVline',
        value: function lineVline(line1, line2) {}
    }, {
        key: 'rectangleVline',
        value: function rectangleVline(rectangle, line) {}
    }, {
        key: 'circleVline',
        value: function circleVline(circle, line) {}
    }]);

    return Collisions;
}();

exports.default = Collisions;
//# sourceMappingURL=Collisions.js.map