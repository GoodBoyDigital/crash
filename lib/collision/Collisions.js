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

        this[_Shape2.default.CIRCLE | _Shape2.default.CIRCLE] = this.circleVcircle;
        this[_Shape2.default.RECTANGLE | _Shape2.default.RECTANGLE] = this.rectangleVrectangle;
        this[_Shape2.default.LINE | _Shape2.default.LINE] = this.lineVline;
        this[_Shape2.default.RECTANGLE | _Shape2.default.CIRCLE] = this.rectangleVcircle;
        this[_Shape2.default.RECTANGLE | _Shape2.default.LINE] = this.rectangleVline;
        this[_Shape2.default.CIRCLE | _Shape2.default.LINE] = this.circleVline;

        this.contacts = [];
    }

    _createClass(Collisions, [{
        key: 'collide',
        value: function collide(body1, body2) {
            var bounds = body1.globalBounds(tempAABB);
            var bounds2 = body2.globalBounds(tempAABB2

            //  if(this.aabbVaabb(bounds, bounds2))
            // {
            // hit test
            // bounding boxes have collided

            );for (var i = 0; i < body1.shapes.length; i++) {
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
        key: 'circleVcircle',
        value: function circleVcircle(body1, circle1, body2, circle2, success, fail) {
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
    }, {
        key: 'rectangleVrectangle',
        value: function rectangleVrectangle(rect1, rect2) {}
    }, {
        key: 'lineVline',
        value: function lineVline(line1, line2) {}
    }, {
        key: 'rectangleVcircle',
        value: function rectangleVcircle(bodyRect, rectangle, bodyCirc, circle, success, fail) {
            var s = Math.sin(-rectangle.rotation);
            var c = Math.cos(-rectangle.rotation);

            var ox = bodyRect.position.x + rectangle.position.x;
            var oy = bodyRect.position.y + rectangle.position.y;

            var cx = bodyCirc.position.x + circle.position.x;
            var cy = bodyCirc.position.y + circle.position.y;

            var localCirclePositionRot = new _Vector2.default();
            localCirclePositionRot.x = c * (cx - ox) - s * (cy - oy) + ox;
            localCirclePositionRot.y = s * (cx - ox) + c * (cy - oy) + oy;

            var localCirclePosition = _Vector2.default.sub(localCirclePositionRot, localCirclePosition, aabb.position);

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

                penetrationLine2 = new _Vector2.default(); //new Vector();
                penetrationLine2.x = penetrationLine.x * c + penetrationLine.y * s;
                penetrationLine2.y = penetrationLine.y * c - penetrationLine.x * s;

                // reaction...
                //  circle.position.x -= penetrationLine2.x * (penetration);
                //   circle.position.y -= penetrationLine2.y * (penetration);

                success(bodyRect, rectangle, bodyCirc, circle, penetration, penetrationLine2

                //success(circle, aabb, penetration, penetrationLine2);
                );return;
            } else if (radius * radius > dist) {
                var penetrationLine = localCirclePosition.minus(closestPoint);

                var penetration = penetrationLine.length() - radius;

                if (penetration < 0) {
                    penetrationLine.normalize();

                    penetrationLine2 = this.temp3; //new Vector();
                    penetrationLine2.x = penetrationLine.x * c + penetrationLine.y * s;
                    penetrationLine2.y = penetrationLine.y * c - penetrationLine.x * s;

                    // reaction...
                    //  circle.position.x -= penetrationLine2.x * (penetration);
                    //  circle.position.y -= penetrationLine2.y * (penetration);


                    success(bodyRect, rectangle, bodyCirc, circle, penetration, penetrationLine2);

                    return;
                }
            }

            //no collision
            fail(bodyRect, rectangle, bodyCirc, circle);
        }
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