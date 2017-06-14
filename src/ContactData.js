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
    }

    getOtherObject(body)
    {
        return body === this.body1 ? this.body2 : this.body1
    }
}


ContactData.pool = [];