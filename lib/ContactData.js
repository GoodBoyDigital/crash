'use strict';

exports.__esModule = true;

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        // this._temp = Vector.create();
    }

    ContactData.prototype.getOtherObject = function getOtherObject(body) {
        return body === this.body1 ? this.body2 : this.body1;
    };

    ContactData.prototype.getOtherShape = function getOtherShape(body) {
        return body === this.body1 ? this.shape2 : this.shape1;
    };

    ContactData.prototype.getProjection = function getProjection(body) {
        return body === this.body1 ? this.projection : _Vector2.default.create(this.projection.x * -1, this.projection.y * -1);
    };

    return ContactData;
}();

exports.default = ContactData;


ContactData.pool = [];
//# sourceMappingURL=ContactData.js.map