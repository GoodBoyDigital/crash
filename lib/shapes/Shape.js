'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('../AABB');

var _AABB2 = _interopRequireDefault(_AABB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UID = 0;

var Shape = function Shape() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Vector2.default();
    var rotation = arguments[2];

    _classCallCheck(this, Shape);

    this.position = position;
    this.rotation = rotation || 0;
    this.type = type;

    this.sensor = false;

    this.boundingBox = new _AABB2.default();

    this.id = UID++;
};

exports.default = Shape;


Shape.RECTANGLE = 1;
Shape.CIRCLE = 2;
Shape.LINE = 4;
//# sourceMappingURL=Shape.js.map