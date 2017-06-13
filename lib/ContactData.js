"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(ContactData, [{
        key: "getOtherObject",
        value: function getOtherObject(object) {
            return object === this.object1 ? this.object2 : this.object1;
        }
    }]);

    return ContactData;
}();

exports.default = ContactData;


ContactData.pool = [];
//# sourceMappingURL=ContactData.js.map