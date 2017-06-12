
import Vector from '../Vector';
import AABB from '../AABB';

export default class Shape
{

    constructor(type = 0, position = new Vector(), rotation)
    {
        this.position = position;
        this.rotation = rotation || 0;
        this.type = type;

        this.sensor = false;

        this.boundingBox = new AABB();
    }
}

Shape.RECTANGLE = 0;
Shape.CIRCLE = 1;
Shape.LINE = 2;