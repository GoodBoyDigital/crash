
import Vector from './Vector';
import AABB from './AABB';
import ContactData from './ContactData';

import Shape from './shapes/Shape';
import circleVcircle from './collision/circleVcircle';
import rectangleVcircle from './collision/rectangleVcircle';


const tempAABB = new AABB();
const tempAABB2 = new AABB();

export default class NarrowPhase
{
    constructor()
    {
        this.collisionMap = {};

        this.pool = [];

        this.tickId = 0;

        this.currentCollisions = [];
        this.contactPool = [];

        this.collisionDatas = [];

        this[Shape.CIRCLE | Shape.CIRCLE] = circleVcircle;
        this[Shape.RECTANGLE | Shape.RECTANGLE] = this.rectangleVrectangle;
        this[Shape.LINE | Shape.LINE] = this.lineVline;
        this[Shape.RECTANGLE | Shape.CIRCLE] = rectangleVcircle;
        this[Shape.RECTANGLE | Shape.LINE] = this.rectangleVline;
        this[Shape.CIRCLE | Shape.LINE] = this.circleVline;
    }


    collide(collisions)
    {
        this.tickId ++;

        //TODO OPTIMISE THIS SHIZ
        //for(var j = 0; j < 1; j++)
        //{
        for (var i = 0; i < collisions.length; i+=2)
        {
            // first aabb checks..

            const bounds = body1.globalBounds(collisions[i])
            const bounds2 = body2.globalBounds(collisions[i+1])

            if(this.aabbVaabb(bounds, bounds2))
            {
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
                                shape2,
                                this.collisionSuccess,
                                this.collisionsFail
                            );
                        }
                        else
                        {
                            this[shape2.type | shape1.type](
                                body2,
                                shape2,
                                body1,
                                shape1,
                                this.collisionSuccess,
                                this.collisionsFail
                            );
                        }
                    }
                }
            }
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

    collisionSuccess(body1, shape1, body2, shape2, penetration, projection)
    {
        var key;

        if(shape1.UID > shape2.UID)
        {
            key = (shape2.UID << 12) + shape1.UID;//shape1.UID + ":"+ shape2.UID;
        }
        else
        {
            key = (shape1.UID << 12) + shape2.UID;//shape1.UID + ":"+ object2.UID;

        }

        var contactData = this.collisionMap[key];

        if( contactData )
        {
            contactData.penetration = penetration;
            contactData.projection = projection;
            contactData._tickId = this.tickId;
        }
        else
        {
            contactData = this.pool.pop();

            if(!contactData)
            {
                contactData = new CrashData(object1,
                                            object2,
                                            penetration,
                                            projection,
                                            false);
            }
            else
            {
                contactData.object1 = object1;
                contactData.object2 = object2;
                contactData.penetration = penetration;
                contactData.projection = projection;
                contactData.ignore = false;
            }

            contactData._key = key;
            contactData._tickId = this.tickId;

            this.collisionMap[key] = contactData;

            this.currentCollisions.push(contactData);

        }
    }

    collisionsFail(body1, circle1, body2, circle2)
    {
        // no more collision!
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

    endCollision(collisionData)
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

           // if(collisionData.object1.onCollideEnd)collisionData.object1.onCollideEnd(collisonData);
           // if(collisionData.object2.onCollideEnd)collisionData.object2.onCollideEnd(collisonData);
        }


       return collisonData;
    }

    reset()
    {
        this.collisions ={};
        this.tickId = 0;

        this.currentCollisions = [];
    }
}