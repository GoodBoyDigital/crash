'use strict';

exports.__esModule = true;

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('./AABB');

var _AABB2 = _interopRequireDefault(_AABB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UID = 0;

var Body = function () {
    function Body() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Body);

        this.type = Body.DYNAMIC;

        this.shapes = data.shapes || [];

        this.position = _Vector2.default.create();
        this.lastPosition = _Vector2.default.create();
        this.interpolatedPosition = _Vector2.default.create();

        this.velocity = _Vector2.default.create();
        this.acceleration = _Vector2.default.create();
        this.bounce = 0;

        this.maxSpeed = data.maxSpeed || 5;

        this.gravity = data.gravity || 0; //0.1;

        this.friction = data.friction || 0.9;

        this.active = true;

        this.timeScale = 1;

        this.boundingBox = new _AABB2.default();
        this.boundsDirty = true;

        this.id = UID++;

        this.collisionMask = 0;

        this.canCollide = true;
    }

    Body.prototype.addShape = function addShape(shape) {
        if (this.shapes.indexOf(shape) === -1) {
            this.shapes.push(shape);
        }

        this.boundsDirty = true;
    };

    Body.prototype.globalBounds = function globalBounds(out) {
        var boundingBox = this.boundingBox;
        var position = this.position;

        out.lower.x = boundingBox.lower.x + position.x;
        out.lower.y = boundingBox.lower.y + position.y;

        out.upper.x = boundingBox.upper.x + position.x;
        out.upper.y = boundingBox.upper.y + position.y;

        return out;
    };

    Body.prototype.updateBounds = function updateBounds() {
        this.boundsDirty = false;

        var minX = Infinity;
        var minY = Infinity;

        var maxX = -Infinity;
        var maxY = -Infinity;

        for (var i = 0; i < this.shapes.length; i++) {

            var box = this.shapes[i].boundingBox;

            maxX = Math.max(maxX, box.upper.x);
            maxY = Math.max(maxY, box.upper.y);
            minX = Math.min(minX, box.lower.x);
            minY = Math.min(minY, box.lower.y);
        }

        this.boundingBox.set(minX, minY, maxX, maxY);
    };

    Body.prototype.update = function update(deltaTime) {
        if (!this.active) return;

        var velocity = this.velocity;

        velocity.x += this.acceleration.x * deltaTime;
        velocity.y += this.acceleration.y * deltaTime;

        // frsition...
        velocity.y *= this.friction;
        velocity.x *= this.friction;

        velocity.y += this.gravity * this.timeScale;

        var speed = velocity.length();

        if (speed > 0) {
            velocity.x /= speed;
            velocity.y /= speed;

            speed = Math.min(speed, this.maxSpeed);

            velocity.x *= speed;
            velocity.y *= speed;
        }

        this.position.x += velocity.x * this.timeScale * deltaTime;
        this.position.y += velocity.y * this.timeScale * deltaTime;
    };

    Body.prototype.reset = function reset() {
        this.velocity.set(0);
        this.acceleration.set(0);

        this.active = true;
    };

    return Body;
}();

exports.default = Body;


Body.STATIC = 0;
Body.KINIMATIC = 1;
Body.DYNAMIC = 2;
Body.NONE = 3;

/*
    getDebugView(color)
    {
        var shape = this.shape;
        var color = color || colors[this.type]
        return new PIXI.Graphics().beginFill(color).drawRect(shape.x,shape.y,shape.width, shape.height)

    }

    CrashBody.fromRect = function(x, y, w, h){

        return new CrashBody(new PIXI.Rectangle(x,y,w,h));
    }

    CrashBody.STATIC = 0;
    CrashBody.KINIMATIC = 1;
    CrashBody.DYNAMIC = 2;
    CrashBody.NONE = 3;

    colors = [
        0x463a78,
        0xFFFF00,
        0xFF0000,
        0x0000FF
    ]
    module.exports = CrashBody;

});*/
//# sourceMappingURL=Body.js.map