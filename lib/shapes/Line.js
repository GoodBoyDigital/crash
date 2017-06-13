'use strict';

exports.__esModule = true;

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('../AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _Shape2 = require('./Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Line = function (_Shape) {
    _inherits(Line, _Shape);

    function Line(length, position, rotation) {
        _classCallCheck(this, Line);

        var _this = _possibleConstructorReturn(this, _Shape.call(this, _Shape3.default.LINE, position, rotation));

        var s = Math.sin(rotation);
        var c = Math.cos(rotation);

        var halfLength = length / 2;
        _this.start = new _Vector2.default(-halfLength * c, -halfLength * s);
        _this.end = new _Vector2.default(halfLength * c, halfLength * s);

        var minX = Math.min(_this.start.x, _this.end.x);
        var minY = Math.min(_this.start.y, _this.end.y);

        var maxX = Math.max(_this.start.x, _this.end.x);
        var maxY = Math.max(_this.start.y, _this.end.y);

        _this.boundingBox.set(_this.position.x + minX, _this.position.y + minY, _this.position.x + maxX, _this.position.y + maxY);
        return _this;
    }

    return Line;
}(_Shape3.default);
/*
    Line.prototype.getView = function(color)
    {
        return new PIXI.Graphics().lineStyle(5, color || 0x00FF00).moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);////drawCircle(0,0,this.radius);
    }

    module.exports = Line;

*/


exports.default = Line;
//# sourceMappingURL=Line.js.map