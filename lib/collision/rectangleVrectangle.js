'use strict';

exports.__esModule = true;
exports.default = rectangleVrectangle;

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rectangleVrectangle(body1, rectangle1, body2, rectangle2, success, fail) {
    var PI2 = Math.PI * 2;
    //if( !(rectangle1.rotation % PI2) && !(rectangle1.rotation % PI2) )
    // {
    /*
            success(body1,
                    rectangle1,
                    body2,
                    rectangle2,
                    penetration,
                    penetrationLine1)
        }
    
    */

    //no collision
    fail(body1, rectangle1, body2, rectangle2);
}
//# sourceMappingURL=rectangleVrectangle.js.map