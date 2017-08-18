'use strict';

exports.__esModule = true;

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _AABB = require('./AABB');

var _AABB2 = _interopRequireDefault(_AABB);

var _Circle = require('./shapes/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Line = require('./shapes/Line');

var _Line2 = _interopRequireDefault(_Line);

var _Rectangle = require('./shapes/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UID = 0;

var Body = function () {
    function Body() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Body);

        this.type = data.type || Body.DYNAMIC;

        this.mass = 0;

        this.shapes = data.shapes || [];

        this.position = _Vector2.default.create();
        this.lastPosition = _Vector2.default.create();
        this.interpolatedPosition = _Vector2.default.create();

        this.velocity = _Vector2.default.create();
        this.acceleration = _Vector2.default.create();
        this.bounce = 0;

        this.maxSpeed = data.maxSpeed || 10000;

        this.gravity = data.gravity || 0; //0.1;

        this.friction = data.friction || 0.99;

        this.active = true;

        this.timeScale = 1;

        this.boundingBox = new _AABB2.default();
        this.boundsDirty = true;

        this.bounce = 0.1;
        this.contactFriction = 1;
        this.friction = 1;

        this.id = UID++;

        this.collisionMask = 0;

        this.canCollide = true;

        //        velX = x - lastX
        //velY = y - lastY

        //nextX = x + velX + accX * timestepSq
        //nextY = y + velY + accY * timestepSq

        //lastX = x
        //lastY = y

        //x = nextX
        //y = nextY
    }

    Body.prototype.addShape = function addShape(shape) {
        if (this.shapes.indexOf(shape) === -1) {
            this.shapes.push(shape);
        }
        //console.log("<>>add shape <>")
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

    Body.prototype.invalidateBounds = function invalidateBounds() {
        this.boundsDirty = true;
    };

    Body.prototype.updateBounds = function updateBounds() {
        if (!this.boundsDirty) return;
        this.boundsDirty = false;

        //      console.log("-- updating bounds --")

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

        var speed = _Vector2.default.len(velocity);

        if (speed > 0) {
            velocity.x /= speed;
            velocity.y /= speed;

            speed = Math.min(speed, this.maxSpeed);

            velocity.x *= speed;
            velocity.y *= speed;
        }

        this.position.x += velocity.x * this.timeScale * deltaTime;
        this.position.y += velocity.y * this.timeScale * deltaTime;

        this.lastPosition.x = this.position.x;
        this.lastPosition.y = this.position.y;
    };

    Body.prototype.reset = function reset() {
        this.velocity.set(0);
        this.acceleration.set(0);

        this.active = true;
    };

    Body.createCircle = function createCircle(data, radius, x, y) {
        var body = new Body(data);
        body.addShape(new _Circle2.default(radius, _Vector2.default.create(x, y)));

        return body;
    };

    Body.createRectangle = function createRectangle(data, width, height, x, y, r) {
        var body = new Body(data);
        body.addShape(new _Rectangle2.default(width, height, _Vector2.default.create(x, y), r));

        return body;
    };

    Body.createLine = function createLine(data, length, x, y, rotation) {
        var body = new Body(data);
        body.addShape(new _Line2.default(length, _Vector2.default.create(x, y), rotation));

        return body;
    };

    return Body;
}();

exports.default = Body;


Body.DYNAMIC = 1;
Body.STATIC = 2;
Body.KINIMATIC = 4;

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