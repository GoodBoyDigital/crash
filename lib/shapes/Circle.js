'use strict';

exports.__esModule = true;

var _AABB = require('../AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _Shape2 = require('./Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_Shape) {
    _inherits(Circle, _Shape);

    function Circle(radius, position) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, _Shape.call(this, _Shape3.default.CIRCLE, position));

        _this.radius = radius;

        _this.boundingBox.set(_this.position.x - radius, _this.position.y - radius, _this.position.x + radius, _this.position.y + radius);
        return _this;
    }

    /*Circle.prototype.getView = function()
    {
        return new PIXI.Graphics().beginFill(0xFF0000).drawCircle(0,0,this.radius);
    }*/


    return Circle;
}(_Shape3.default);

exports.default = Circle;
//# sourceMappingURL=Circle.js.map