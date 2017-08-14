  //  var CollisionTest = require('../Group');

import Group from './utils/Group';
import Body from './Body';

import NarrowPhase from './NarrowPhase';
import Signal from 'mini-signals';

export default class World
{


    constructor()
    {
        // on hit test against.. platforms
        this.onCollideBegin = new Signal();
        this.onCollideEnd = new Signal();

        this.staticBodies = this[Body.STATIC] = new Group();
        this.dynamicBodies = this[Body.DYNAMIC] = new Group();
        this.bodies = new Group();

        this.collisions = [];
        this.narrowPhase = new NarrowPhase(this);

        this.dt = 1;

        this.collisionKeys = {};

        this.DEBUG = false;

        this.registerCollison(0,0);




    }

    add(body)
    {
        this[body.type].add(body);
        this.bodies.add(body);
    }

    remove(body)
    {
        this[body.type].remove(body);
        this.bodies.remove(body);
    }

    update()
    {
        //TODO seperate to a broadphase
       // console.log(this.bodies.children.length)
        for (var i = 0; i < this.dynamicBodies.children.length; i++)
        {
            this.dynamicBodies.children[i].update(this.dt);
        };

        var collisions = this.getCollisions();
        this.narrowPhase.collide(collisions);
    }

    reset()
    {
        this.staticBodies.empty();
        this.dynamicBodies.empty();
        this.bodies.empty();

        this.collisions.length = 0;

        this.narrowPhase.reset();

    }

    getKey(a, b)
    {
        return (a << 12) + b;
    }

    registerCollison(type1, type2)
    {
        this.collisionKeys[this.getKey(type1, type2)] = true;
        this.collisionKeys[this.getKey(type2, type1)] = true;
    }

    updateBounds()
    {
        // TODO no need to update static!
        var list = this.bodies.children;

        for (var i = 0; i < list.length; i++)
        {
            list[i].updateBounds();
        }
    }

    getCollisions()
    {
        this.collisions.length = 0;

        var size = 0;

        this.updateBounds();

        //SAP!
        var list =  this.bodies.children;

        this.sortAxisList( list );

        for (var i = 0; i < list.length; i++)
        {
            var body1 = list[i];
            var newItemLeft = body1.position.x + body1.boundingBox.upper.x;
            for (var j = i+1; j < list.length; j++)
            {
                var body2 = list[j];

                var currentItemRight = body2.position.x + body2.boundingBox.lower.x;// - 5;

                if(newItemLeft <= currentItemRight)
                {
                    break;
                }
                else
                {
                    if(this.canCollide(body1, body2))
                    {
                        // this is important to add as it makes sure bodies are hit test in the correct order
                        // every frame whilst a collision endures
                        if(body1.id > body2.id)
                        {
                           this.collisions.push(body1,
                                                body2);
                        }
                        else
                        {
                            this.collisions.push(body2,
                                                 body1);
                        }
                    }

                }
            }
        };

        // finallly hit tes the bounds..

        return this.collisions;
    }

    canCollide(body1, body2)
    {
        if((body1.type | body2.type) !== (Body.STATIC | Body.STATIC))
        {
            if(body2.canCollide && body1.canCollide)
            {
                var key = this.getKey(body2.collisionMask, body1.collisionMask)

                if(this.collisionKeys[key])
                {
                    return true;
                }
            }
        }


        return false;
    }

    sortAxisList(a)
    {
        for(var i=1,l=a.length; i<l; i++)
        {
            var v = a[i];
            for(var j=i - 1;j>=0;j--)
            {
                var a2 = a[j];

                if(a2.boundingBox.lower.x + a2.position.x  <= v.boundingBox.lower.x + v.position.x )
                {
                    break;
                }

                a[j+1] = a[j];
            }

            a[j+1] = v;
        }

        return a;
    };

}