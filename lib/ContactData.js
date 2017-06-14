"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactData = function () {
    function ContactData(body1, shape1, body2, shape2, penetration, projection, ignore) {
        _classCallCheck(this, ContactData);

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

    ContactData.prototype.getOtherObject = function getOtherObject(body) {
        return body === this.body1 ? this.body2 : this.body1;
    };

    return ContactData;
}();

exports.default = ContactData;


ContactData.pool = [];
//# sourceMappingURL=ContactData.js.map