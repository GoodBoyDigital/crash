export default class ContactData
{

    constructor(body1, shape1, body2, shape2, penetration, projection, ignore)
    {
        this.object1 = object1;
        this.object2 = object2;
        this.penetration = penetration;
        this.projection = projection;
        this.ignore = ignore || false;

        this._key = null;
        this._tickId = null;
    }

    getOtherObject(object)
    {
        return object === this.object1 ? this.object2 : this.object1
    }
}


ContactData.pool = [];