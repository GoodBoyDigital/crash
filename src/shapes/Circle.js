import AABB from '../AABB';
import Shape from './Shape';

export default class Circle extends Shape
{
    constructor(radius, position)
    {
        super(Shape.CIRCLE, position);

        this.radius = radius;

        this.boundingBox.set(this.position.x - radius,
                             this.position.y - radius,
                             this.position.x + radius,
                             this.position.y + radius);
    }

    /*Circle.prototype.getView = function()
    {
        return new PIXI.Graphics().beginFill(0xFF0000).drawCircle(0,0,this.radius);
    }*/
}
