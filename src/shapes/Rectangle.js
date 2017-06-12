import Vector from '../Vector'
import AABB from '../AABB';
import Shape from './Shape';

const temp = new Vector();
const temp2 = new Vector();

export default class Rectangle extends Shape
{
    constructor(width, height, position, rotation)
    {
        super(Shape.RECTANGLE, position, rotation);

        this.width = width;
        this.height = height;

        // TODO make smalle..

        this.updateBounds();

    }

    updateBounds()
    {
        const rotation = this.rotation;

        if(rotation % (Math.PI * 2) === 0)
        {
            this.boundingBox.set(this.position.x - this.width/2,
                                 this.position.y - this.height/2,
                                 this.position.x + this.width/2,
                                 this.position.y + this.height/2);

        }
        else if(rotation % (Math.PI * 0.5) === 0)
        {
            this.boundingBox.set(this.position.x - this.height/2,
                                 this.position.y - this.width/2,
                                 this.position.x + this.height/2,
                                 this.position.y + this.width/2);

        }
        else
        {
            let maxX = -Infinity;
            let minX = Infinity;

            let maxY = -Infinity;
            let minY = Infinity;

            const point = temp2;
            const halfWidth = this.width/2;
            const halfHeight = this.height/2;

            point.x = -halfWidth;
            point.y = -halfHeight;

            Vector.rotate(temp, point, rotation);

            maxX = Math.max(maxX, temp.x);
            maxY = Math.max(maxY, temp.y);
            minX = Math.min(minX, temp.x);
            minY = Math.min(minY, temp.y);

            point.x = halfWidth;
            point.y = -halfHeight;

            Vector.rotate(temp, point, rotation);

            maxX = Math.max(maxX, temp.x);
            maxY = Math.max(maxY, temp.y);
            minX = Math.min(minX, temp.x);
            minY = Math.min(minY, temp.y);

            point.x = halfWidth;
            point.y = halfHeight;

            Vector.rotate(temp, point, rotation);

            maxX = Math.max(maxX, temp.x);
            maxY = Math.max(maxY, temp.y);
            minX = Math.min(minX, temp.x);
            minY = Math.min(minY, temp.y);

            point.x = -halfWidth;
            point.y = halfHeight;

            Vector.rotate(temp, point, rotation);

            maxX = Math.max(maxX, temp.x);
            maxY = Math.max(maxY, temp.y);
            minX = Math.min(minX, temp.x);
            minY = Math.min(minY, temp.y);

            this.boundingBox.set(this.position.x + minX,
                                 this.position.y + minY,
                                 this.position.x + maxX,
                                 this.position.y + maxY);
        }

    }
}
/*
    Line.prototype.getView = function(color)
    {
        return new PIXI.Graphics().lineStyle(5, color || 0x00FF00).moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);////drawCircle(0,0,this.radius);
    }

    module.exports = Line;

    Rectangle.prototype.getView = function(color)
    {
        var shape = new PIXI.Graphics().beginFill(color || 0x2a3e3f).drawRect(-this.halfWidth/2, -this.height/2, this.width, this.height);
        shape.rotation = this.rotation;

        return shape;
    }
*/
