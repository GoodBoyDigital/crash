'use strict';

define(function (require, exports, module) {
    var Group = require('fido/bob/Group');

    //  var CollisionTest = require('../Group');

    var NarrowPhase = require('./NarrowPhase');
    var CrashBody = require('./CrashBody');
    var SpatialHash = require('./SpatialHash');

    var CrashWorld = function CrashWorld() {
        // on hit test against.. platforms

        // this.staticItems = new Group();
        this.staticItems = new SpatialHash();

        //TODO add this..
        this.kinimaticItems = new Group();

        // hit test against each other..
        this.dynamicItems = new Group();

        this.collisions = [];
        this.narrowPhase = new NarrowPhase();

        this.dt = 1;

        this.collisionKeys = {};

        this.DEBUG = false;
    };

    CrashWorld.prototype.init = function (world) {
        // init..
    };

    CrashWorld.prototype.preupdate = function () {
        // init..
    };

    CrashWorld.prototype.add = function (item) {
        if (!item.body) return;

        if (this.DEBUG) {
            if (!item._debugView) {
                item._debugView = item.body.getDebugView();
                item._debugView.alpha = 0.5;
                if (item.view) {
                    item.view.addChild(item._debugView);
                }
            }
        }

        if (item.body.type === CrashBody.STATIC) {
            this.staticItems.add(item);
            //            this.staticHash.add()
            //  item.body.update();
        } else if (item.body.type === CrashBody.KINIMATIC) {
            this.kinimaticItems.add(item);
        } else if (item.body.type === CrashBody.DYNAMIC) {
            this.dynamicItems.add(item);
        }
    };

    CrashWorld.prototype.remove = function (item) {
        if (!item.body) return;

        if (item.body.type === CrashBody.STATIC) {
            this.staticItems.remove(item);
        } else if (item.body.type === CrashBody.KINIMATIC) {
            this.kinimaticItems.remove(item);
        } else if (item.body.type === CrashBody.DYNAMIC) {
            this.dynamicItems.remove(item);
        }
    };

    CrashWorld.prototype.update = function () {

        //TODO broadphase

        var collisions = this.getCollisions();

        for (var i = 0; i < this.dynamicItems.children.length; i++) {
            this.dynamicItems.children[i].body.update(this.dt);
        };

        this.narrowPhase.hitTest(collisions);
        // };

    };

    CrashWorld.prototype.postupdate = function (item) {};

    CrashWorld.prototype.reset = function () {
        this.staticItems.empty();
        this.kinimaticItems.empty();
        this.dynamicItems.empty();

        this.collisions.length = 0;

        this.narrowPhase.reset();
    };

    CrashWorld.prototype.onCollision = function (item, item2) {};

    CrashWorld.prototype.getKey = function (a, b) {
        return (a << 12) + b;
    };

    CrashWorld.prototype.registerCollison = function (type1, type2) {
        //        key = type1 + ":"+ type2;

        this.collisionKeys[this.getKey(type1, type2)] = true;
        this.collisionKeys[this.getKey(type2, type1)] = true;

        //console.log(this.collisionKeys);
    };

    CrashWorld.prototype.getCollisions = function () {
        this.collisions.length = 0;

        var size = 0;

        /*    // hit test all dynamic - dynamic objects
            for (var i = 0; i < this.dynamicItems.children.length; i++)
            {
                 for (var j = i+1; j < this.dynamicItems.children.length; j++)
                {
                    var item = this.dynamicItems.children[i];
                    var platform = this.dynamicItems.children[j];
                     var canCollide = true;
                    var key = this.getKey(platform.type, item.type)
         //           console.log(key)
                    //TODO items that are the same cannot collide..
                    if(!this.collisionKeys[key])//platform.type === item.type && !item.collideWithSelf)
                    {
                        canCollide = false;
                    }
                    else
                    {
                        if(!platform.canCollide || !item.canCollide)
                        {
                            canCollide = false;
                        }
                    }
                     if(canCollide)
                    {
                        this.collisions.push(item,
                                            platform)
                    }
                }
            };
        */

        //SAP!
        var list = this.dynamicItems.children;
        this.sortAxisList(list);

        for (var i = 0; i < list.length; i++) {
            var item1 = list[i];
            var newItemLeft = item1.body.position.x + item1.body.shape.x + item1.body.shape.width + 5;;

            for (var j = i + 1; j < list.length; j++) {
                var item2 = list[j];

                var currentItemRight = item2.body.position.x + item2.body.shape.x - 5;
                if (newItemLeft <= currentItemRight) {
                    break;
                } else {
                    var canCollide = true;
                    var key = this.getKey(item2.type, item1.type
                    //TODO items that are the same cannot collide..

                    );if (!this.collisionKeys[key]) //platform.type === item.type && !item.collideWithSelf)
                        {
                            canCollide = false;
                        } else {
                        if (!item2.canCollide || !item1.canCollide) {
                            canCollide = false;
                        }
                    }

                    if (canCollide) {
                        this.collisions.push(item1, item2);
                    }
                }
            }
        };
        ///

        // hit test all static - dynamic objects
        for (var i = 0; i < this.dynamicItems.children.length; i++) {
            var item = this.dynamicItems.children[i];
            var staticItems = this.staticItems.retrieveArea(item);

            for (var j = 0; j < staticItems.length; j++) {
                var platform = staticItems[j];

                if (platform.canCollide && item.canCollide) {
                    // if(item.DEBUG)
                    // {
                    //     console.log(item, platform)
                    // }

                    this.collisions.push(item, platform);
                }
            }
        };

        // hit test all kinimatic - dynamic objects
        for (var i = 0; i < this.dynamicItems.children.length; i++) {

            for (var j = 0; j < this.kinimaticItems.children.length; j++) {
                var item = this.dynamicItems.children[i];
                var platform = this.kinimaticItems.children[j];

                var canCollide = true;
                var key = this.getKey(platform.type, item.type
                //TODO items that are the same cannot collide..

                );if (!this.collisionKeys[key]) //platform.type === item.type && !item.collideWithSelf)
                    {
                        canCollide = false;
                    } else {
                    if (!item.canCollide || !platform.canCollide) {
                        canCollide = false;
                    }
                }

                if (canCollide) {
                    //var canCollide = true;
                    //  var key = this.getKey(item.type, platform.type)
                    //TODO items that are the same cannot collide..
                    //if(this.collisionKeys[key])//platform.type === item.type && !item.collideWithSelf)
                    //{
                    if (item.debug) {
                        console.log(platform);
                    }
                    this.collisions.push(item, platform
                    // }

                    );
                }
            }
        };

        // finallly hit tes the bounds..


        return this.collisions;
    };

    CrashWorld.prototype.sortAxisList = function (a) {
        for (var i = 1, l = a.length; i < l; i++) {
            var v = a[i];
            for (var j = i - 1; j >= 0; j--) {
                var a2 = a[j];

                if (a2.body.shape.x + a2.body.position.x <= v.body.shape.x + v.body.position.x) {
                    break;
                }

                a[j + 1] = a[j];
            }

            a[j + 1] = v;
        }

        return a;
    };

    CrashWorld.prototype.castRay = function (point, point2) {};

    CrashWorld.prototype.constrainToBounds = function () {
        var b = this.bounds;

        //TODO add some boundng blocks..
        for (var i = 0; i < this.dynamicItems.children.length; i++) {
            var body = this.dynamicItems.children[i].body;

            // Constrain the x
            if (body.position.x + body.shape.x < b.x) {
                body.position.x = b.x + body.shape.x;
            } else if (body.position.x + body.shape.x + body.shape.width > b.x + b.width) {
                body.position.x = b.x + b.width - (body.shape.x + body.shape.width);
            }

            // Constrain the y
            if (body.position.y + body.shape.y < b.y) {
                body.position.y = b.y + body.shape.y;
            } else if (body.position.y + body.shape.y + body.shape.height > b.y + b.height) {
                body.position.y = b.y + b.height - (body.shape.y + body.shape.height);
                this.dynamicItems.children[i].onGround = true;
            }
        };
    };

    CrashWorld.prototype.setBounds = function (rect) {
        this.bounds.x = rect.x;
        this.bounds.y = rect.y;
        this.bounds.width = rect.width;
        this.bounds.height = rect.height;
    };

    CrashWorld.prototype.clear = function () {
        this.reset();
    };

    module.exports = CrashWorld;
});
//# sourceMappingURL=CrashWorld.js.map