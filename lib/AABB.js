'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AABB = function () {
    function AABB() {
        var lowerX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var lowerY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var upperX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var upperY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, AABB);

        this.upper = _Vector2.default.create();
        this.lower = _Vector2.default.create();

        this.set(lowerX, lowerY, upperX, upperY);
    }

    _createClass(AABB, [{
        key: 'set',
        value: function set(lowerX, lowerY, upperX, upperY) {
            this.lower.x = lowerX;
            this.lower.y = lowerY;

            this.upper.x = upperX;
            this.upper.y = upperY;
        }
    }, {
        key: 'setRect',
        value: function setRect(x, y, width, height) {
            this.lower.x = x;
            this.lower.y = y;

            this.upper.x = x + width;
            this.upper.y = y + height;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.upper.x - this.lower.x;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.upper.y - this.lower.y;
        }
    }]);

    return AABB;
}();

exports.default = AABB;
//# sourceMappingURL=AABB.js.map