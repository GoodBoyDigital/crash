"use strict";

define(function (require, exports, module) {

    var CollisonData = function CollisonData(object1, object2, penetration, projection, ignore) {
        this.object1 = object1;
        this.object2 = object2;
        this.penetration = penetration;
        this.projection = projection;
        this.ignore = ignore || false;

        this._key = null;
        this._tickId = null;
    };

    CollisonData.prototype.getOtherObject = function (object) {
        return object === this.object1 ? this.object2 : this.object1;
    };

    CollisonData.pool = [];

    module.exports = CollisonData;
});
//# sourceMappingURL=CrashData.js.map