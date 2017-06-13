"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactData = function () {
    function ContactData(body1, shape1, body2, shape2, penetration, projection, ignore) {
        _classCallCheck(this, ContactData);

        this.object1 = object1;
        this.object2 = object2;
        this.penetration = penetration;
        this.projection = projection;
        this.ignore = ignore || false;

        this._key = null;
        this._tickId = null;
    }

    ContactData.prototype.getOtherObject = function getOtherObject(object) {
        return object === this.object1 ? this.object2 : this.object1;
    };

    return ContactData;
}();

exports.default = ContactData;


ContactData.pool = [];
//# sourceMappingURL=ContactData.js.map