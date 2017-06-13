
import AABB from './AABB';
import Vector from './Vector';
import Shape from './shapes/Shape';

import circleVcircle from './collision/circleVcircle';
import rectangleVcircle from './collision/rectangleVcircle';

const tempAABB = new AABB();
const tempAABB2 = new AABB();

export default class Collisions
{
    /*
     * @class Vector
     * @constructor
     * @param x {Number} position of the point
     * @param y {Number} position of the point
     */
    constructor(x, y)
    {
        this.collisionMap = {};

        //(object2.UID << 12) + object1.UID;

        this[Shape.CIRCLE | Shape.CIRCLE] = circleVcircle;
        this[Shape.RECTANGLE | Shape.RECTANGLE] = this.rectangleVrectangle;
        this[Shape.LINE | Shape.LINE] = this.lineVline;
        this[Shape.RECTANGLE | Shape.CIRCLE] = rectangleVcircle;
        this[Shape.RECTANGLE | Shape.LINE] = this.rectangleVline;
        this[Shape.CIRCLE | Shape.LINE] = this.circleVline;


        this.contacts = [];
    }

    collide(body1, body2)
    {
        const bounds = body1.globalBounds(tempAABB)
        const bounds2 = body2.globalBounds(tempAABB2)

        if(this.aabbVaabb(bounds, bounds2))
        {
            // hit test
            // bounding boxes have collided

            for (var i = 0; i < body1.shapes.length; i++)
            {
                const shape1 = body1.shapes[i];

                for (var j = 0; j < body2.shapes.length; j++)
                {
                    const shape2 = body2.shapes[j];

                    if(shape1.type < shape2.type)
                    {
                        this[shape1.type | shape2.type](
                            body1,
                            shape1,
                            body2,
                            shape2
                        );
                    }
                    else
                    {
                        this[shape2.type | shape1.type](
                            body2,
                            shape2,
                            body1,
                            shape1
                        );
                    }
                }
            }
        }
        else
        {

        }

    }


    aabbVaabb(aabb1, aabb2)
    {
        const lower1 = aabb1.lower;
        const upper1 = aabb1.upper;
        const lower2 = aabb2.lower;
        const upper2 = aabb2.upper;

        return ((lower2.x <= upper1.x && upper1.x <= upper2.x) || (lower1.x <= upper2.x && upper2.x <= upper1.x)) &&
               ((lower2.y <= upper1.y && upper1.y <= upper2.y) || (lower1.y <= upper2.y && upper2.y <= upper1.y));
    }

    rectangleVrectangle(rect1, rect2)
    {

    }

    lineVline(line1, line2)
    {

    }

    rectangleVline(rectangle, line)
    {

    }

    circleVline(circle, line)
    {

    }
}
