import Vector from '../Vector'
import AABB from '../AABB';
import Shape from './Shape';

export default class Line extends Shape
{
    constructor(length, position, rotation)
    {
        super(Shape.LINE, position, rotation);

        var s = Math.sin(rotation);
        var c = Math.cos(rotation);

        var halfLength = length/2;
        this.start  = new Vector(-halfLength * c, -halfLength * s);
        this.end    = new Vector( halfLength * c,  halfLength * s);

        var minX = Math.min(this.start.x, this.end.x);
        var minY = Math.min(this.start.y, this.end.y);

        var maxX = Math.max(this.start.x, this.end.x);
        var maxY = Math.max(this.start.y, this.end.y);

        this.boundingBox.set(this.position.x + minX,
                             this.position.y + minY,
                             this.position.x + maxX,
                             this.position.y + maxY);


    }
}
/*
    Line.prototype.getView = function(color)
    {
        return new PIXI.Graphics().lineStyle(5, color || 0x00FF00).moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);////drawCircle(0,0,this.radius);
    }

    module.exports = Line;

*/