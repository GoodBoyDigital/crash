'use strict';

exports.__esModule = true;

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Solver = function () {
    function Solver() {
        _classCallCheck(this, Solver);
    }

    Solver.prototype.solve = function solve(collsions) {
        for (var i = collsions.length - 1; i >= 0; i--) {
            var collision = collsions[i];

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

                this.bounce(body2, body1, _Vector2.default.create(-projection.x, -projection.y));
            }

            var dx = projection.x * penetration;
            var dy = projection.y * penetration;

            body1.position.x -= dx * amount;
            body1.position.y -= dy * amount;

            body2.position.x += dx * amount2;
            body2.position.y += dy * amount2;
        }
    };

    Solver.prototype.bounce = function bounce(body1, body2, projection) {
        var collisionForce = _Vector2.default.sub(_Vector2.default.create(), body1.velocity, body2.velocity);
        // convert to 90 degs
        var perp = new _Vector2.default(projection.y, -projection.x);

        var frictionVector = _Vector2.default.project(_Vector2.default.create(), collisionForce, perp);
        var projectionToLine2 = _Vector2.default.project(_Vector2.default.create(), collisionForce, projection);

        var bounceVector = new _Vector2.default(0, 0);
        bounceVector.x = projection.x * _Vector2.default.len(projectionToLine2);
        bounceVector.y = projection.y * _Vector2.default.len(projectionToLine2);

        _Vector2.default.mul(frictionVector, frictionVector, body1.friction);
        _Vector2.default.mul(bounceVector, bounceVector, body1.bounce);

        body1.velocity.x = frictionVector.x + bounceVector.x;
        body1.velocity.y = frictionVector.y + bounceVector.y;
    };

    return Solver;
}();

exports.default = Solver;
//# sourceMappingURL=Solver.js.map