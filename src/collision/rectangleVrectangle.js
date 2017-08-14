
import Vector from '../Vector';

export default function rectangleVrectangle(body1, rectangle1, body2, rectangle2, success, fail)
{

    if(rectangle1.rotation === 0 && rectangle2.rotation === 0)
    {
        /*
        if(body1.id > body2.id)
        {
            var t = rectangle1;
            rectangle1 = rectangle2;
            rectangle2 = t;

            var t = body1;
            body1 = body2;
            body2 = t;
        }
        */
        var p1x = rectangle1.position.x + body1.position.x;
        var p1y = rectangle1.position.y + body1.position.y;

        var p2x = rectangle2.position.x + body2.position.x;
        var p2y = rectangle2.position.y + body2.position.y;



        var topDist =  (p1y + rectangle1.height/2) - (p2y - rectangle2.height/2);
        var bottomDist = (p2y + rectangle2.height/2) - (p1y - rectangle1.height/2);

        var leftDist = (p1x + rectangle1.width/2) - (p2x - rectangle2.width/2);
        var rightDist = (p2x + rectangle2.width/2) - (p1x - rectangle1.width/2);

        var dist = 999999;

        if(leftDist < dist)dist = leftDist;
        if(rightDist < dist)dist = rightDist;
        if(topDist < dist)dist = topDist;
        if(bottomDist < dist)dist = bottomDist;

     //   console.log(leftDist, rightDist, topDist, bottomDist)
        if(dist >= 0)
        {
            // hit!
            var penetrationLine =  Vector.create();

            if(dist == leftDist)
            {
                //console.log('left')
                penetrationLine.x = -1;
                penetrationLine.y = 0;
            }
            else if(dist == rightDist)
            {
                //console.log('right')
                penetrationLine.x = 1;
                penetrationLine.y = 0;
            }
            else if(dist == topDist)
            {
                //console.log('top')
                penetrationLine.x = 0;
                penetrationLine.y = -1;
            }
            else if(dist == bottomDist)
            {
                //console.log('bottom')
                penetrationLine.x = 0;
                penetrationLine.y = 1;
            }

            var penetration = -dist;


            success(body1,
                    rectangle1,
                    body2,
                    rectangle2,
                    penetration,
                    penetrationLine);
            //return new CollisonData(item, item2, penetration, penetrationLine, false);
            //item.collisonReaction();
        }
        else
        {
           // //console.log("FAIL")
            fail(body1,
                rectangle1,
                body2,
                rectangle2);

            //return null;
        }
    }
    else
    {
        console.warn('rotated rectangles.. will not collide just yet')
    }
    //if( !(rectangle1.rotation % PI2) && !(rectangle1.rotation % PI2) )
   // {
/*
        success(body1,
                rectangle1,
                body2,
                rectangle2,
                penetration,
                penetrationLine1)
    }

*/
    //console.log("FAIL")

    //no collision
    fail(body1,
         rectangle1,
         body2,
         rectangle2);
}
