
import Vector from './Vector';
import AABB from './AABB';
import ContactData from './ContactData';
import Solver from './Solver';

import Shape from './shapes/Shape';
import circleVcircle from './collision/circleVcircle';
import rectangleVcircle from './collision/rectangleVcircle';
import rectangleVrectangle from './collision/rectangleVrectangle';
import circleVLine from './collision/circleVline';


const tempAABB = new AABB();
const tempAABB2 = new AABB();

export default class NarrowPhase
{
    constructor(world)
    {
        this.world = world;

        this.collisionMap = {};

        this.pool = [];

        this.tickId = 0;

        this.currentCollisions = [];
        this.contactPool = [];

        this.collisionDatas = [];

        this[Shape.CIRCLE | Shape.CIRCLE] = circleVcircle;
        this[Shape.RECTANGLE | Shape.RECTANGLE] = rectangleVrectangle;
        this[Shape.LINE | Shape.LINE] = this.lineVline;
        this[Shape.RECTANGLE | Shape.CIRCLE] = rectangleVcircle;
        this[Shape.RECTANGLE | Shape.LINE] = this.rectangleVline;
        this[Shape.CIRCLE | Shape.LINE] = circleVLine;

        this.collisionSuccess = this.collisionSuccess.bind(this);
        this.collisionFail = this.collisionFail.bind(this);

        this.solver = new Solver();
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

            const body1 = collisions[i];
            const body2 = collisions[i+1];

            const bounds = body1.globalBounds(tempAABB)
            const bounds2 = body2.globalBounds(tempAABB2)

            if(this.aabbVaabb(bounds, bounds2))
            {
                for (var j = 0; j < body1.shapes.length; j++)
                {
                    const shape1 = body1.shapes[j];

                    for (var k = 0; k < body2.shapes.length; k++)
                    {
                        const shape2 = body2.shapes[k];

                        if(shape1.type < shape2.type)
                        {
                            this[shape1.type | shape2.type](
                                body1,
                                shape1,
                                body2,
                                shape2,
                                this.collisionSuccess,
                                this.collisionFail
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
                                this.collisionFail
                            );
                        }
                    }
                }
            }
        }

        // check for dead collisons..
        for (var i = 0; i < this.currentCollisions.length; i++)
        {

            var collisonData = this.currentCollisions[i];

            if(collisonData._tickId !== this.tickId)
            {
                // ended!
                this.endCollision( collisonData );
                this.currentCollisions.splice(i, 1);
                i--;
            }

        };

        // solve current collisions..
        this.solver.solve(this.currentCollisions);
    }

    collisionSuccess(body1, shape1, body2, shape2, penetration, projection)
    {
        var key;

        if(shape1.id > shape2.id)
        {
            key = (shape2.id << 12) + shape1.id;//shape1.id + ":"+ shape2.id;
        }
        else
        {
            key = (shape1.id << 12) + shape2.id;//shape1.UID + ":"+ object2.UID;

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
         //   console.log("collision begin")
            contactData = this.pool.pop();

            if(!contactData)
            {
                contactData = new ContactData(body1,
                                              shape1,
                                              body2,
                                              shape2,
                                              penetration,
                                              projection,
                                              false);
            }
            else
            {
                contactData.body1 = body1;
                contactData.shape1 = shape1;
                contactData.body2 = body2;
                contactData.shape2 = shape2;

                contactData.penetration = penetration;
                contactData.projection = projection;
                contactData.ignore = false;
            }

            contactData._key = key;
            contactData._tickId = this.tickId;

            this.world.onCollideBegin.dispatch(contactData);

            this.currentCollisions.push(contactData);
            this.collisionMap[key] = contactData;

        }
    }

    collisionFail(body1, circle1, body2, circle2)
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

        var contactData = this.collisionMap[key];

        if( contactData )
        {
          //  console.log("collision end")

            if(!contactData.ignore)
            {
                this.world.onCollideEnd.dispatch(contactData);
            }

            this.contactPool.push( contactData );
            this.collisionMap[key] = null;

        }

        //TODO think about this!
       // if(collisionData.object1.world)
        {

           // if(collisionData.object1.onCollideEnd)collisionData.object1.onCollideEnd(collisonData);
           // if(collisionData.object2.onCollideEnd)collisionData.object2.onCollideEnd(collisonData);
        }


       return collisionData;
    }

    reset()
    {
        this.collisionMap ={};
        this.tickId = 0;

        this.currentCollisions = [];
    }
}