'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var temp = new _Vector2.default();
var temp2 = new _Vector2.default();

var Rectangle = function (_Shape) {
    _inherits(Rectangle, _Shape);

    function Rectangle(width, height, position, rotation) {
        _classCallCheck(this, Rectangle);

        var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, _Shape3.default.RECTANGLE, position, rotation));

        _this.width = width;
        _this.height = height;

        // TODO make smalle..

        _this.updateBounds();

        return _this;
    }

    _createClass(Rectangle, [{
        key: 'updateBounds',
        value: function updateBounds() {
            var rotation = this.rotation;

            if (rotation % (Math.PI * 2) === 0) {
                this.boundingBox.set(this.position.x - this.width / 2, this.position.y - this.height / 2, this.position.x + this.width / 2, this.position.y + this.height / 2);
            } else if (rotation % (Math.PI * 0.5) === 0) {
                this.boundingBox.set(this.position.x - this.height / 2, this.position.y - this.width / 2, this.position.x + this.height / 2, this.position.y + this.width / 2);
            } else {
                var maxX = -Infinity;
                var minX = Infinity;

                var maxY = -Infinity;
                var minY = Infinity;

                var point = temp2;
                var halfWidth = this.width / 2;
                var halfHeight = this.height / 2;

                point.x = -halfWidth;
                point.y = -halfHeight;

                _Vector2.default.rotate(temp, point, rotation);

                maxX = Math.max(maxX, temp.x);
                maxY = Math.max(maxY, temp.y);
                minX = Math.min(minX, temp.x);
                minY = Math.min(minY, temp.y);

                point.x = halfWidth;
                point.y = -halfHeight;

                _Vector2.default.rotate(temp, point, rotation);

                maxX = Math.max(maxX, temp.x);
                maxY = Math.max(maxY, temp.y);
                minX = Math.min(minX, temp.x);
                minY = Math.min(minY, temp.y);

                point.x = halfWidth;
                point.y = halfHeight;

                _Vector2.default.rotate(temp, point, rotation);

                maxX = Math.max(maxX, temp.x);
                maxY = Math.max(maxY, temp.y);
                minX = Math.min(minX, temp.x);
                minY = Math.min(minY, temp.y);

                point.x = -halfWidth;
                point.y = halfHeight;

                _Vector2.default.rotate(temp, point, rotation);

                maxX = Math.max(maxX, temp.x);
                maxY = Math.max(maxY, temp.y);
                minX = Math.min(minX, temp.x);
                minY = Math.min(minY, temp.y);

                this.boundingBox.set(this.position.x + minX, this.position.y + minY, this.position.x + maxX, this.position.y + maxY);
            }
        }
    }]);

    return Rectangle;
}(_Shape3.default);
/*
    Line.prototype.getView = function(color)
    {
        return new PIXI.Graphics().lineStyle(5, color || 0x00FF00).moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);////drawCircle(0,0,this.radius);
    }

    module.exports = Line;

    Rectangle.prototype.getView = function(color)
    {
        var shape = new PIXI.Graphics().beginFill(color || 0x2a3e3f).drawRect(-this.halfWidth/2, -this.height/2, this.width, this.height);
        shape.rotation = this.rotation;

        return shape;
    }
*/


exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map