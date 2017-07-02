'use strict';

exports.__esModule = true;

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var temp1 = _Vector2.default.create();
var temp2 = _Vector2.default.create();
var temp3 = _Vector2.default.create();
var temp4 = _Vector2.default.create();

var Solver = function () {
    function Solver() {
        _classCallCheck(this, Solver);
    }

    Solver.prototype.solve = function solve(collsions) {
        for (var i = collsions.length - 1; i >= 0; i--) {
            var collision = collsions[i];

            if (!collision.shape1.sensor && !collision.shape2.sensor) {
                var projection = collision.projection;
                var penetration = collision.penetration;
                var body1 = collision.body1;
                var body2 = collision.body2;

                var amount = 0.5;
                var amount2 = 0.5;

                if (body2.type === _Body2.default.STATIC) {
                    amount = 1;
                    amount2 = 0;

                    this.bounce(body1, body2, projection);
                } else if (body1.type === _Body2.default.STATIC) {
                    amount = 0;
                    amount2 = 1;

                    this.bounce(body2, body1, _Vector2.default.set(temp4, -projection.x, -projection.y));
                }

                var dx = projection.x * penetration;
                var dy = projection.y * penetration;

                body1.position.x -= dx * amount;
                body1.position.y -= dy * amount;

                body2.position.x += dx * amount2;
                body2.position.y += dy * amount2;
            }
        }
    };

    Solver.prototype.bounce = function bounce(body1, body2, projection) {
        var collisionForce = _Vector2.default.sub(temp3, body1.velocity, body2.velocity);

        // this kind works!
        if (_Vector2.default.dot(collisionForce, projection) > 0) {
            return;
        }

        // convert to 90 degs
        var perp = new _Vector2.default(projection.y, -projection.x);

        var frictionVector = _Vector2.default.project(temp1, collisionForce, perp);
        var projectionToLine2 = _Vector2.default.project(temp2, collisionForce, projection);

        var bounceVector = new _Vector2.default(0, 0);
        bounceVector.x = projection.x * _Vector2.default.len(projectionToLine2);
        bounceVector.y = projection.y * _Vector2.default.len(projectionToLine2);

        _Vector2.default.mul(frictionVector, frictionVector, body1.contactFriction);
        _Vector2.default.mul(bounceVector, bounceVector, body1.bounce);

        body1.velocity.x = frictionVector.x + bounceVector.x;
        body1.velocity.y = frictionVector.y + bounceVector.y;
    };

    return Solver;
}();

exports.default = Solver;
//# sourceMappingURL=Solver.js.map