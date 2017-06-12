define(function (require, exports, module)
{
    var Signal = require('signals');
    var _TICK = 0;
    /**
     * Game obj
     * @param {PIXI obj} view
     */
    var SpatialHash = function(width, height, size)
    {
        this.hash = [];
         // this.hash = {};

        this.width = 300;
        this.height = 300;

        this.size = 64 + 32;

        this.buildHash();
        this.cache = {};



    }

    SpatialHash.prototype.buildHash = function()
    {
        var width = this.width;
        var height = this.height;

        var size = width * height;

        for (var i = 0; i < size; i++)
        {
            this.hash[i] = [];
        };

        this.cache = {};
    }

    SpatialHash.prototype.add = function(obj)
    {
        this.cache = {};

        var shift = 5; // power of two!
        var hitArea = obj.body.shape;
        var sx = ((obj.position.x + hitArea.x) / this.size) | 0,
            sy = ((obj.position.y + hitArea.y) / this.size) | 0,
            ex = ((obj.position.x +  hitArea.x + hitArea.width )/ this.size) | 0,
            ey = ((obj.position.y +  hitArea.y + hitArea.height)/ this.size) | 0,
            x, y;


        for(y=sy;y<=ey;y++)
        {
            for(x=sx;x<=ex;x++)
            {
                //TODO take out the floor!
                var id = y * this.width + x;

                if(! this.hash[id] )
                {

                }
                else
                {
                    this.hash[id].push( obj );
                }
            }
        }

    }

    SpatialHash.prototype.retrieve = function(obj)
    {
        // current square is..
        var x = (obj.position.x / this.size) | 0,
            y = (obj.position.y / this.size) | 0;

        var ret = this.cache[x + ":" + y];

        if(!ret)
        {
            ret = [];

            // get the 9 squares..
            ret = this.addSquare(x-1, y-1, ret)
            ret = this.addSquare(x, y-1, ret)
            ret = this.addSquare(x+1, y-1, ret)
            ret = this.addSquare(x-1, y, ret)
            ret = this.addSquare(x, y, ret)
            ret = this.addSquare(x+1, y, ret)
            ret = this.addSquare(x, y+1, ret)
            ret = this.addSquare(x, y+1, ret)
            ret = this.addSquare(x+1, y+1, ret);

            ret = this.removeDuplicates(ret);

            this.cache[x + ":" + y] = ret;

            //console.log("CACHE")
        }

        return ret;
    }

    SpatialHash.prototype.addSquare = function(x, y, array)
    {
        var id = y * this.width + x;
        if(!this.hash[id])
        {

        }
        else
        {
            array = array.concat( this.hash[id] );
        }

        return array;
    }

    var tempArray = [];

    SpatialHash.prototype.retrieveArea = function(obj)
    {
        var shift = 5; // power of two!
        var hitArea = obj.body.shape;
        var sx = ((obj.position.x + hitArea.x) / this.size) | 0,
            sy = ((obj.position.y + hitArea.y) / this.size) | 0,
            ex = ((obj.position.x +  hitArea.x + hitArea.width )/ this.size) | 0,
            ey = ((obj.position.y +  hitArea.y + hitArea.height)/ this.size) | 0,
            x, y;

        var ret = tempArray;
        tempArray.length = 0;

        var tick = _TICK++;
        var index = 0;

        for(y=sy;y<=ey;y++)
        {
            for(x=sx;x<=ex;x++)
            {
                var id = y * this.width + x;

                var cell = this.hash[id];

                if( cell )
                {
                    for (var i = 0; i < cell.length; i++)
                    {

                        var item = cell[i];

                        if(item._TICK !== tick)
                        {
                            item._TICK = tick;
                            ret[index++] = item;
                        }

                    };
                }
            }
        }

        return  ret;

    }

    SpatialHash.prototype.removeDuplicates = function(array)
    {
        var seen = {};
        var out = [];
        var len = array.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = array[i];
             if(seen[item.UID] !== 1) {
                   seen[item.UID] = 1;
                   out[j++] = item;
             }
        }
        return out;
    }

    SpatialHash.prototype.remove = function(obj)
    {
        var shift = 5; // power of two!

        /* @mat it used to be this next line

        var hitArea = obj.hitArea.hitArea;
        not sure how that ever worked since obj.hitArea doesn't exist ? maybe a legacy thing :)

        and I changed it to this :
        var hitArea = obj.body.shape;
        */
       var hitArea = obj.body.shape;

        var sx = ((obj.position.x + hitArea.x) / this.size) | 0,
            sy = ((obj.position.y + hitArea.y) / this.size) | 0,
            ex = ((obj.position.x +  hitArea.x + hitArea.width )/ this.size) | 0,
            ey = ((obj.position.y +  hitArea.y + hitArea.height)/ this.size) | 0,
            x, y;
        for(y=sy;y<=ey;y++)
        {
            for(x=sx;x<=ex;x++)
            {
                var id = y * this.width + x;
                if(id > 0)
                {

                    var index = this.hash[id].indexOf(obj);
                    if(index !== -1)
                    {
                        this.hash[id].splice(index, 1);
                    }

                }

                // also remove from cache..
                // TODO OPTIMISE..
                this.cache = {};
            }
        }

        //TODO invalidate caches??
    }

    SpatialHash.prototype.empty = function()
    {
        this.buildHash();
    }

    module.exports = SpatialHash;

});