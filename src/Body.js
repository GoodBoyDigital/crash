import Vector from './Vector';
import AABB from './AABB';

export default class Body
{

    constructor(data = {})
    {
        this.type = Body.DYNAMIC;

        this.shapes = data.shapes || [];

        this.position = Vector.create();
        this.lastPosition = Vector.create();
        this.interpolatedPosition = Vector.create();

        this.velocity = Vector.create();
        this.acceleration = Vector.create();
        this.bounce = 0;

        this.maxSpeed = data.maxSpeed || 5;

        this.gravity = data.gravity || 0;//0.1;

        this.friction = data.friction || 0.9;

        this.active = true;

        this.timeScale = 1;

        this.boundingBox = new AABB();
        this.boundsDirty = true;

    }

    addShape(shape)
    {
        if(this.shapes.indexOf(shape) === -1)
        {
            this.shapes.push(shape);
        }

        this.boundsDirty = true;
    }

    updateBounds()
    {
        this.boundsDirty = false;

        let minX = Infinity;
        let minY = Infinity;

        let maxX = -Infinity;
        let maxY = -Infinity;

        for (var i = 0; i < this.shapes.length; i++) {

            const box = this.shapes[i].boundingBox;

            maxX = Math.max(maxX, box.upper.x);
            maxY = Math.max(maxY, box.upper.y);
            minX = Math.min(minX, box.lower.x);
            minY = Math.min(minY, box.lower.y);
        }

        this.boundingBox.set(minX, minY, maxX, maxY);
    }

    update(deltaTime)
    {
        if(!this.active)return;

        var velocity = this.velocity

        velocity.x += this.acceleration.x * deltaTime;
        velocity.y += this.acceleration.y * deltaTime;

        // frsition...
        velocity.y *= this.friction;
        velocity.x *= this.friction;

        velocity.y += this.gravity * this.timeScale;

        var speed = velocity.length();

        if(speed > 0)
        {
            velocity.x /= speed;
            velocity.y /= speed;

            speed = Math.min(speed,this.maxSpeed);

            velocity.x *= speed;
            velocity.y *= speed;
        }


        this.position.x += velocity.x * this.timeScale * deltaTime;
        this.position.y += velocity.y * this.timeScale * deltaTime;
    }

    reset()
    {
        this.velocity.set(0);
        this.acceleration.set(0);

        this.active = true;
    }
}

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