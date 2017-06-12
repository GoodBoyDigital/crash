define(function (require, exports, module)
{
    var PIXI = require('PIXI');
    var Math2 = require('fido/utils/Math2');
    var Vector = require('./Vector');

    var CrashBody = function( shape )
    {
        this.type = CrashBody.DYNAMIC;

        this.shape = shape;
        this.passthrough = false;

        //TODO extend to outside of top
        //this.onSurface = false;
        this.currentSurface = null;

        this.position = new PIXI.Point();
      //  this.lastPosition = new PIXI.Point();

        this.timeScale = 1;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.bounce = 0;

        this.maxSpeed = 3;
        this.maxSpeedY = 3;//00000;
        this.gravity = 0//0.1;

        this.friction = 0.9;

        this.sleeping = false;

        this.solid = true;
        this.active = true;

        this.remainder = 0;
        this.flip = 1;

        //this.scale = 3;
    }

    CrashBody.prototype.setMaxSpeed = function(max)
    {
        this.maxSpeed = this.maxSpeedY = max;
    }

    CrashBody.prototype.update = function(deltaTime)
    {
        if(!this.active)return;

      //  var dt = this.remainder + Ticker.instance.deltaTime;
            var velocity = this.velocity
      //  for (var i = 0; i < dt; i++)
     //   {
            velocity.x += this.acceleration.x * deltaTime;
            velocity.y += this.acceleration.y * deltaTime;

            // frsition...
            velocity.y *= this.friction;
            velocity.x *= this.friction;
            velocity.y += this.gravity * this.timeScale// * this.flip;

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

//            dt -= 1;
  //      };

      //  this.remainder = dt;



    }

    CrashBody.prototype.reset = function()
    {
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        this.remainder = 0;

        this.active = true;
    }

    CrashBody.prototype.getDebugView = function(color)
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

});