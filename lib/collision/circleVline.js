'use strict';

exports.__esModule = true;
exports.default = circleVLine;

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var temp = _Vector2.default.create();
var temp2 = _Vector2.default.create();
var temp3 = _Vector2.default.create();
var temp4 = _Vector2.default.create();
var temp5 = _Vector2.default.create();
var temp6 = _Vector2.default.create();
var temp7 = _Vector2.default.create();
var temp8 = _Vector2.default.create();

function circleVLine(body1, circle, body2, line, success, fail) {

    // hit test circle line!
    var point1 = _Vector2.default.add(temp, line.position, line.start);
    var point2 = _Vector2.default.add(temp2, line.position, line.end);

    var radius = circle.radius;

    var face = _Vector2.default.sub(temp3, point2, point1);

    var normal = _Vector2.default.create(-face.y, face.x);
    _Vector2.default.normalize(normal, normal);

    var circlePosition = _Vector2.default.add(temp4, body1.position, circle.position);
    var linePosition = _Vector2.default.add(temp5, body2.position, line.position);

    var localCirclePosition = _Vector2.default.sub(temp6, circlePosition, linePosition);

    var positionToProject = _Vector2.default.sub(temp7, localCirclePosition, point1);
    var projectedCircle = _Vector2.default.project(temp8, positionToProject, normal);

    var dp1 = _Vector2.default.dot(positionToProject, face);

    if (dp1 < 0) {
        var penetration = _Vector2.default.len(positionToProject) - radius;
        _Vector2.default.normalize(positionToProject, positionToProject);

        if (penetration < 0) {
            success(body1, circle, body2, line, penetration, positionToProject);
        } else {
            fail(body1, circle, body2, line);
        }

        return;
    }

    positionToProject = _Vector2.default.sub(temp7, localCirclePosition, point2);
    projectedCircle = _Vector2.default.project(temp8, positionToProject, normal);
    dp1 = _Vector2.default.dot(positionToProject, face);

    if (dp1 > 0) {
        var penetration = _Vector2.default.len(positionToProject) - radius;
        _Vector2.default.normalize(positionToProject, positionToProject);

        if (penetration < 0) {
            success(body1, circle, body2, line, penetration, positionToProject);
            /// out //
        } else {

            fail(body1, circle, body2, line);
        }

        return;
    }

    var penetration = _Vector2.default.len(projectedCircle) - radius;

    var projection = normal; //.clone(this.temp6);

    // what size?
    var s = (point2.x - point1.x) * (localCirclePosition.y - point1.y) - (point2.y - point1.y) * (localCirclePosition.x - point1.x);
    s = s > 0 ? 1 : -1;

    projection.x *= s;
    projection.y *= s;

    if (penetration < 0) {
        _Vector2.default.normalize(projection, projection);
        success(body1, circle, body2, line, penetration, projection);
    }

    fail(body1, circle, body2, line);
}
//# sourceMappingURL=circleVline.js.map