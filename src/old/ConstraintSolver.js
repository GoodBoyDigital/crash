define(function (require, exports, module) 
{
    var CrashBody = require('./CrashBody');

    var ConstraintSolver = function()
    {

    }

    ConstraintSolver.solve = function(collisions, first)
    {
        for ( i = 0; i <  collisions.length; i++) 
        { 
           
            var crashData = collisions[i];
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
                        item.body.velocity.x -= forceX;
                    }
                }
                else
                {
                    if(forceY*projection.y <= 0)
                    {
                        item.body.velocity.y -= forceY;
                    }

                    // moving platforms..                    
                    item.body.position.x += platform.body.velocity.x;
                }
           
            }
        }
    }

    ConstraintSolver.solve3 = function(crashData)
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
                    item.body.velocity.x -= forceX;
                }
            }
            else
            {
                if(forceY*projection.y <= 0)
                {
                    item.body.velocity.y -= forceY;
                }
                
                // moving platforms..                    
                item.body.position.x += platform.body.velocity.x;
            }
       
        }
    }


    ConstraintSolver.solve2 = function(collisions, first)
    {
        for ( i = 0; i <  collisions.length; i++) 
        { 
            var crashData = collisions[i];
            var item = crashData.object1;
            var platform = crashData.object2;
            var item2 = crashData.object2;

            var projection =  crashData.projection;
            var penetration =  crashData.penetration;

            var body1 = item.body;
            var body2 = item2.body;

            var rect1 = body1.shape;
            var rect2 = body2.shape;

            var p1x = rect1.x + item.position.x;
            var p1y = rect1.y + item.position.y;

            var p2x = rect2.x + item2.position.x;
            var p2y = rect2.y + item2.position.y;

            var topDist =  (p1y + rect1.height) - p2y;
        //bias??
        //topDist +=
        var bottomDist = (p2y + rect2.height) - p1y;

        var leftDist = (p1x + rect1.width) - p2x;
        var rightDist = (p2x + rect2.width) - p1x;

        var dist = 999999;
        
        // cheecky padding for pass through
        if(item2.passthrough)
        {
         //   leftDist += 4;
           // rightDist += 4;
        }

        //
        //
        
        if(leftDist < dist)dist = leftDist;
        if(rightDist < dist)dist = rightDist;
        if(topDist < dist)dist = topDist;
        if(bottomDist < dist)dist = bottomDist;

        if(dist > 0)
        {
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

            penetration = -dist;


           // crashData.penetration = penetration;

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
                        item.body.velocity.x -= forceX;
                    }
                }
                else
                    {
                    if(forceY*projection.y <= 0)
                    {
                        item.body.velocity.y -= forceY;
                    }
                    // moving platforms..                    
                    item.body.position.x += platform.body.velocity.x;
                }
           
            }
            
            }

        }

    }

    module.exports = ConstraintSolver

});