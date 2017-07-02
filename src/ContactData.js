import Vector from './Vector';

export default class ContactData
{

    constructor(body1, shape1, body2, shape2, penetration, projection, ignore)
    {
        this.body1 = body1;
        this.shape1 = shape1;
        this.body2 = body2;
        this.shape2 = shape2;
        this.penetration = penetration;
        this.projection = projection;
        this.ignore = ignore || false;

        this._key = null;
        this._tickId = null;

       // this._temp = Vector.create();
    }

    getOtherObject(body)
    {
        return body === this.body1 ? this.body2 : this.body1;
    }

    getOtherShape(body)
    {
        return body === this.body1 ? this.shape2 : this.shape1;
    }

    getPenetration(body)
    {
        return body === this.body1 ? this.projection : Vector.create(this.penetration.x * -1, this.penetration.y * -1);
    }
}


ContactData.pool = [];