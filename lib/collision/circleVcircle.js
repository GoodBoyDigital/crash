'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = circleVcircle;

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function circleVcircle(body1, circle1, body2, circle2, success, fail) {
    var px = body1.position.x + circle1.position.x;
    var py = body1.position.y + circle1.position.y;

    var px2 = body2.position.x + circle2.position.x;
    var py2 = body2.position.y + circle2.position.y;

    var dx = px - px2;
    var dy = py - py2;

    var dist = Math.sqrt(dx * dx + dy * dy);

    var penetration = dist - (circle1.radius + circle2.radius);

    if (penetration < 0) {
        // TODO pooling..
        success(body1, circle1, body2, circle2, penetration, _Vector2.default.create(dx / dist, dy / dist));
    } else {
        fail(body1, circle1, body2, circle2);
    }
}
//# sourceMappingURL=circleVcircle.js.map