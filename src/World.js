  //  var CollisionTest = require('../Group');

import Group from './utils/Group';
import Body from './Body';

import NarrowPhase from './NarrowPhase';

export default class World
{


    constructor()
    {
        // on hit test against.. platforms

        this.staticBodies = this[Body.STATIC] = new Group();
        this.dynamicBodies = this[Body.DYNAMIC] = new Group();
        this.bodies = new Group();

        this.collisions = [];
        this.narrowPhase = new NarrowPhase();

        this.dt = 1;

        this.collisionKeys = {};

        this.DEBUG = false;

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

        //TODO broadphase

        var collisions = this.getCollisions();

        console.log(collisions);

        for (var i = 0; i < this.dynamicItems.children.length; i++)
        {
            this.dynamicItems.children[i].body.update(this.dt);
        };

        //this.narrowPhase.hitTest(collisions);
       // };


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

    getCollisions()
    {
        this.collisions.length = 0;

        var size = 0;

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

                var currentItemRight = body2.body.position.x + body2.boundingBox.lower.x;// - 5;

                if(newItemLeft <= currentItemRight)
                {
                    break;
                }
                else
                {
                    var canCollide = true;
                    var key = this.getKey(item2.type, item1.type)
                    //TODO items that are the same cannot collide..

                    if(!this.collisionKeys[key])//platform.type === item.type && !item.collideWithSelf)
                    {
                        canCollide = false;
                    }
                    else
                    {
                        if(!body2.canCollide || !body1.canCollide)
                        {
                            canCollide = false;
                        }
                    }

                    if(canCollide)
                    {
                       this.collisions.push(body1,
                                            body2);
                    }
                }
            }
        };

        // finallly hit tes the bounds..


        return this.collisions;
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