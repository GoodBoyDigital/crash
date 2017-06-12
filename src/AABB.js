import Vector from './Vector'

export default class AABB
{
    constructor(lowerX = 0, lowerY = 0, upperX = 0, upperY = 0)
    {
        this.upper = Vector.create();
        this.lower = Vector.create();

        this.set(lowerX, lowerY, upperX, upperY)
    }

    set(lowerX, lowerY, upperX, upperY)
    {
        this.lower.x = lowerX;
        this.lower.y = lowerY;

        this.upper.x = upperX;
        this.upper.y = upperY;
    }

    setRect(x, y, width, height)
    {
        this.lower.x = x;
        this.lower.y = y;

        this.upper.x = x + width;
        this.upper.y = y + height;
    }

    get width()
    {
    	return this.upper.x - this.lower.x;
    }

    get height()
    {
    	return this.upper.y - this.lower.y;
    }

}