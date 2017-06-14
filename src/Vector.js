

export default class Vector
{
   /*
     * @class Vector
     * @constructor
     * @param x {Number} position of the point
     * @param y {Number} position of the point
     */
    constructor(x, y)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;
    };

    static create(x, y)
    {
        return new Vector(x, y);
    }

    static clone(v)
    {
        return new Vector(v.x, v.y);
    }

    static add(o, a, b)
    {
        o.x = a.x + b.x;
        o.y = a.y + b.y;

        return o;
    }

    static copy(o, a)
    {
        o.x = a.x;
        o.y = a.y;

        return o;
    }

    static sub(o, a, b)
    {
        o.x = a.x - b.x;
        o.y = a.y - b.y;

        return o;
    }

    static invert(o, v)
    {
        o.x = v.x * -1;
        o.y = v.y * -1;

        return o;
    }

    static mul(o, v, s)
    {
        o.x = v.x * s;
        o.y = v.y * s;

        return o;
    }

    static dot(a, b)
    {
        return a.x * b.x + a.y * b.y;
    }

    static len(a)
    {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }

    static lengthSq(a)
    {
        return a.x * a.x + a.y * a.y;
    }

    static normalize(o, a)
    {
        const scale = Math.sqrt(a.x * a.x + a.y * a.y);

        if(scale === 0)return 0;

        o.x = a.x / scale;
        o.y = a.y / scale;

        return o;
    }

    static distance(a, b)
    {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    static distanceSq(a, b)
    {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return dx * dx + dy * dy;
    }

    static set(v, x, y)
    {
        v.x = x || 0;
        v.y = y || ( (y !== 0) ?  v.x : 0 ) ;

        return v;
    }

    static lerp(o, a, b, ratio)
    {
        o.x = a.x + (b.x - a.x) * ratio;
        o.y = a.y + (b.y - a.y) * ratio;

        return o
    }

    static rad(v)
    {
        return Math.atan2(v.x, v.y);
    }

    static equels(a, b)
    {
        return a.x === b.x && a.y === b.y;
    }

    static rotate(o, a, angle)
    {
        const x = a.x;
        const y = a.y;

        o.x = x * Math.cos(angle) - y * Math.sin(angle);
        o.y = x * Math.sin(angle) + y * Math.cos(angle);
    }

    static project(o, a, b)
    {
        var dp = a.x * b.x + a.y * b.y;
        o.x = ( dp / (b.x*b.x + b.y*b.y) ) * b.x;
        o.y = ( dp / (b.x*b.x + b.y*b.y) ) * b.y;

        return o;
    }

    static projectPoint(o, p, a)
    {
        /*
        var positionLine = new Vector(0,0);
        var projectedPoint = Vector.project(point.clone().minus(positionLine), directionLine);

        return projectedPoint.clone().plus(positionLine);
         */
    }
}
