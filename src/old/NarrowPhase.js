define(function (require, exports, module)
{
    var PIXI = require('PIXI');
    var Vector = require('./Vector');
    var CrashData = require('./CrashData');
    var CrashBody = require('./CrashBody');
    var ConstraintSolver = require('./ConstraintSolver');

    var NarrowPhase = function()
    {
        this.collisions = {};

        this.pool = [];

        this.tickId = 0;

        this.currentCollisions = [];

        this.collisionDatas = [];
    }


    NarrowPhase.prototype.hitTest = function(collisions)
    {
        this.tickId ++;

        //TODO OPTIMISE THIS SHIZ
        for(var j = 0; j < 2; j++)
        {
            for (var i = 0; i < collisions.length; i+=2)
            {
               var data = this.hitTestAABBAABB(collisions[i],  collisions[i+1]);

                if(data)
                {
                    if(data.object1.body.solid && data.object2.body.solid)
                    {
                        this.solve(data);
                    }
                }
            }

//            ConstraintSolver.solve3(this.collisionDatas);
         //   this.collisionDatas.length = 0;
        }


        // check for dead collisons..
        for (var i = 0; i < this.currentCollisions.length; i++) {

            var collisonData = this.currentCollisions[i];

            if(collisonData._tickId !== this.tickId)
            {
                // ended!
                this.endCollision( collisonData );
                this.currentCollisions.splice(i, 1);
                i--;
            }
        };
    }

    NarrowPhase.prototype.hitTestAABBAABB = function(item, item2)
    {

        var body1 = item.body;
        var body2 = item2.body;

       // if(body1.sleeping && body2.sleeping)return;

        var rect1 = body1.shape;
        var rect2 = body2.shape;

        var p1x = rect1.x + item.position.x;
        var p1y = rect1.y + item.position.y;

        var p2x = rect2.x + item2.position.x;
        var p2y = rect2.y + item2.position.y;

        var topDist =  (p1y + rect1.height) - p2y;
        var bottomDist = (p2y + rect2.height) - p1y;

        var leftDist = (p1x + rect1.width) - p2x;
        var rightDist = (p2x + rect2.width) - p1x;

        var dist = 999999;

        if(leftDist < dist)dist = leftDist;
        if(rightDist < dist)dist = rightDist;
        if(topDist < dist)dist = topDist;
        if(bottomDist < dist)dist = bottomDist;

        // som pass through platform bias!
      /*  if(item2.passthrough)
        {
            topDist -= 2;
            if(topDist < dist)
            {
                dist = topDist = topDist + 2;
            }
        }*/

        if(dist > 0)
        {
            // hit!
            var projection = new Vector();

            if(dist == leftDist)
            {
                projection.x = -1;
                projection.y = 0;
            }
            else if(dist == rightDist)
            {
                projection.x = 1;
                projection.y = 0;
            }
            else if(dist == topDist)
            {

                projection.x = 0;
                projection.y = -1;
            }
            else if(dist == bottomDist)
            {
                projection.x = 0;
                projection.y = 1;
            }

            var penetration = -dist;


            var collisionData = this.startCollision(item, item2, penetration, projection);


            if(!collisionData.ignore)
            {
                return collisionData;
            }
        }

        return null;
    }

    NarrowPhase.prototype.solve = function(crashData)
    {
  //      var crashData = collisions[i];
        var item = crashData.object1;
        var platform = crashData.object2;

        var projection =  crashData.projection;
        var penetration =  crashData.penetration;

        if(platform.body.type === CrashBody.DYNAMIC)
        {
            item.position.x -= projection.x * penetration * 0.5;//7;
            item.position.y -= projection.y * penetration * 0.5;//7;

            platform.position.x += projection.x * penetration * 0.5;//3;
            platform.position.y += projection.y * penetration * 0.5;//3;


            // calculate velocits..
            var forceX = item.body.velocity.x - platform.body.velocity.x;
            var forceY = item.body.velocity.y - platform.body.velocity.y;

            if(projection.x !== 0)
            {
                if(forceX*projection.x <= 0)
                {
                    item.body.velocity.x -= forceX * 0.5;
                    platform.body.velocity.x += forceX * 0.5;
                }

            }
            else
            {
                if(forceY*projection.y <= 0)
                {
                    item.body.velocity.y -= forceY * 0.5;
                    platform.body.velocity.y += forceY * 0.5;
                }
            }
        }
        else
        {
            item.position.x -= projection.x * penetration;
            item.position.y -= projection.y * penetration;

            var forceX = item.body.velocity.x - platform.body.velocity.x;
            var forceY = item.body.velocity.y - platform.body.velocity.y;


            if(projection.x !== 0)
            {
                if(forceX*projection.x <= 0)
                {
                    item.body.velocity.x *= -item.body.bounce//-= forceX;
                }
            }
            else
            {
                if(forceY*projection.y <= 0)
                {
                    item.body.velocity.y *= -item.body.bounce//-= forceX;
                  //  item.body.velocity.y -= forceY;
                }

                // moving platforms..
                //item.body.position.x += platform.body.velocity.x;
            }

        }
    }

    NarrowPhase.prototype.startCollision = function(object1, object2, penetration, projection)
    {
        //TODO keep an eye out on this key generation!
        var key;

        if(object1.UID > object2.UID)
        {
            key = (object2.UID << 12) + object1.UID;//object1.UID + ":"+ object2.UID;
        }
        else
        {
            key = (object1.UID << 12) + object2.UID;//object1.UID + ":"+ object2.UID;

        }

        var collisonData = this.collisions[key];

        if( collisonData )
        {

            collisonData.penetration = penetration;
            collisonData.projection = projection;
            collisonData._tickId = this.tickId;

            if(!collisonData.ignore)
            {
                if(projection.y === -1)
                {
                    if(object1.body.velocity.y >= 0)
                    {
                        object1.body.currentSurface = object2;
                        object1.onGround = true;
                    }
                }
                else if(projection.y === 1)
                {
                    if(object2.body.velocity.y >= 0)
                    {
                        object2.body.currentSurface = object1;
                        object2.onGround = true;
                    }
                }
            }


            return collisonData;
        }

        collisonData = this.pool.pop();

        if(!collisonData)
        {
            collisonData = new CrashData(object1,
                                        object2,
                                        penetration,
                                        projection,
                                        false);
        }
        else
        {
            collisonData.object1 = object1;
            collisonData.object2 = object2;
            collisonData.penetration = penetration;
            collisonData.projection = projection;
            collisonData.ignore = false;
        }

        collisonData._key = key;
        collisonData._tickId = this.tickId;

         if(projection.y === -1 * object1.body.flip)
        {
            object1.body.currentSurface = object2;
            object1.onGround = true;
        }
        else if(projection.y === 1 * object2.body.flip)
        {
            object2.body.currentSurface = object1;
            object2.onGround = true;
        }

        //ASSUMING SECOND IS STATIC!
      /*  if(object2.passthrough)
        {
            if(projection.y !== -1 * object1.body.flip)// && object1.body.velocity.y < 0)
            {
                collisonData.ignore = true;
            }
        }*/

        // collisde begine..
        if(object1.onCollideBegin)object1.onCollideBegin(collisonData);
        if(object2.onCollideBegin)object2.onCollideBegin(collisonData);





        this.collisions[key] = collisonData;

        this.currentCollisions.push(collisonData);

        return collisonData;
    }

    NarrowPhase.prototype.endCollision = function(collisionData)
    {

        var key = collisionData._key

        var collisonData = this.collisions[key];

        if( collisonData )
        {
            // end collision..
/*
            if(collisionData.object2 === collisionData.object1.body.currentSurface)
            {
                collisionData.object1.onGround = false;
                collisionData.object1.body.currentSurface = null;
            }
            else if(collisionData.object1 === collisionData.object2.body.currentSurface)
            {
                collisionData.object2.onGround = false;
                collisionData.object2.body.currentSurface = null;
            }
*/
            this.pool.push( collisonData );
            this.collisions[key] = null;

        }

        //TODO think about this!
        if(collisionData.object1.world)
        {

            if(collisionData.object1.onCollideEnd)collisionData.object1.onCollideEnd(collisonData);
            if(collisionData.object2.onCollideEnd)collisionData.object2.onCollideEnd(collisonData);
        }


       return collisonData;
    }

    NarrowPhase.prototype.reset = function()
    {
        this.collisions ={};
        this.tickId = 0;

        this.currentCollisions = [];
    }

    module.exports = NarrowPhase;

});