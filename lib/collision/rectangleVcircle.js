'use strict';

exports.__esModule = true;
exports.default = rectangleVcircle;

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rectangleVcircle(bodyRect, rectangle, bodyCirc, circle, success, fail) {

    var s = Math.sin(-rectangle.rotation);
    var c = Math.cos(-rectangle.rotation);

    var ox = bodyRect.position.x + rectangle.position.x;
    var oy = bodyRect.position.y + rectangle.position.y;

    var cx = bodyCirc.position.x + circle.position.x;
    var cy = bodyCirc.position.y + circle.position.y;

    var localCirclePositionRot = new _Vector2.default();
    localCirclePositionRot.x = c * (cx - ox) - s * (cy - oy) + ox;
    localCirclePositionRot.y = s * (cx - ox) + c * (cy - oy) + oy;

    var localCirclePosition = _Vector2.default.sub(localCirclePositionRot, localCirclePositionRot, new _Vector2.default(ox, oy));

    var radius = circle.radius;
    var rect = rectangle;
    var halfWidth = rect.width / 2;
    var halfHeight = rect.height / 2;

    var closestPoint = _Vector2.default.clone(localCirclePosition);

    if (localCirclePosition.x < -halfWidth) {
        closestPoint.x = -halfWidth;
    } else if (localCirclePosition.x > halfWidth) {
        closestPoint.x = halfWidth;
    }

    if (localCirclePosition.y < -halfHeight) {
        closestPoint.y = -halfHeight;
    } else if (localCirclePosition.y > halfHeight) {
        closestPoint.y = halfHeight;
    }

    var distX = closestPoint.x - localCirclePosition.x;
    var distY = closestPoint.y - localCirclePosition.y;
    var dist = distX * distX + distY * distY;

    if (dist === 0) {
        closestPoint.x = rect.left;

        var leftDist = localCirclePosition.x - rect.left;
        var rightDist = halfWidth - localCirclePosition.x;

        var topDist = localCirclePosition.y - -halfHeight;
        var bottomDist = halfHeight - localCirclePosition.y;

        var dist = 999999;

        if (leftDist < dist) dist = leftDist;
        if (rightDist < dist) dist = rightDist;
        if (topDist < dist) dist = topDist;
        if (bottomDist < dist) dist = bottomDist;

        penetrationLine = new _Vector2.default(); //this.temp4;
        if (dist == leftDist) {
            penetrationLine.x = -1;
            penetrationLine.y = 0.00001;
        } else if (dist == rightDist) {
            penetrationLine.x = 1;
            penetrationLine.y = 0.00001;
        } else if (dist == topDist) {
            penetrationLine.x = 0.00001;
            penetrationLine.y = -1;
        } else if (dist == bottomDist) {
            penetrationLine.x = 0.00001;
            penetrationLine.y = 1;
        }

        var penetration = -dist - radius;

        var penetrationLine2 = new _Vector2.default(); //new Vector();
        penetrationLine2.x = penetrationLine.x * c + penetrationLine.y * s;
        penetrationLine2.y = penetrationLine.y * c - penetrationLine.x * s;

        //  penetrationLine2.x *= -1;
        // penetrationLine2.y *= -1;
        // reaction...
        //  circle.position.x -= penetrationLine2.x * (penetration);
        //   circle.position.y -= penetrationLine2.y * (penetration);

        success(bodyCirc, circle, bodyRect, rectangle, penetration, penetrationLine2

        //success(circle, aabb, penetration, penetrationLine2);
        );return;
    } else if (radius * radius > dist) {
        var penetrationLine = _Vector2.default.sub(localCirclePosition, localCirclePosition, closestPoint);

        var penetration = _Vector2.default.len(penetrationLine) - radius;

        if (penetration < 0) {
            _Vector2.default.normalize(penetrationLine, penetrationLine);

            var _penetrationLine = new _Vector2.default();
            _penetrationLine.x = penetrationLine.x * c + penetrationLine.y * s;
            _penetrationLine.y = penetrationLine.y * c - penetrationLine.x * s;

            // reaction...
            //  circle.position.x -= penetrationLine2.x * (penetration);
            //  circle.position.y -= penetrationLine2.y * (penetration);

            success(bodyCirc, circle, bodyRect, rectangle, penetration, _penetrationLine);

            return;
        }
    }

    //no collision
    fail(bodyRect, rectangle, bodyCirc, circle);
}
//# sourceMappingURL=rectangleVcircle.js.map