
import Vector from '../Vector';
import AABB from '../AABB';

let UID = 0;

export default class Shape
{

    constructor(type = 0, position = new Vector(), rotation)
    {
        this.position = position;
        this.rotation = rotation || 0;
        this.type = type;

        this.sensor = false;

        this.boundingBox = new AABB();

        this.id = UID++;
    }
}

Shape.RECTANGLE = 1;
Shape.CIRCLE = 2;
Shape.LINE = 4;