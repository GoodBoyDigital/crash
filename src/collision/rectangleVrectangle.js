
import Vector from '../Vector';

export default function rectangleVrectangle(body1, rectangle1, body2, rectangle2, success, fail)
{
    const PI2 = Math.PI * 2
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

    //no collision
    fail(body1,
         rectangle1,
         body2,
         rectangle2);
}
