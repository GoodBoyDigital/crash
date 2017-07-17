
import Vector from '../Vector';

var temp = Vector.create();
var temp2 = Vector.create();
var temp3 = Vector.create();
var temp4 = Vector.create();
var temp5 = Vector.create();
var temp6 = Vector.create();
var temp7 = Vector.create();
var temp8 = Vector.create();

export default function circleVLine(body1, circle, body2, line, success, fail)
{


    // hit test circle line!
    var point1 = Vector.add(temp, line.position, line.start);
    var point2 = Vector.add(temp2, line.position, line.end);

    var radius = circle.radius;

    var face = Vector.sub(temp3, point2, point1);

    var normal = Vector.create(-face.y, face.x);
    Vector.normalize(normal, normal);

    var circlePosition = Vector.add(temp4, body1.position, circle.position);
    var linePosition = Vector.add(temp5, body2.position, line.position);

    var localCirclePosition = Vector.sub(temp6, circlePosition, linePosition);

    var positionToProject = Vector.sub(temp7, localCirclePosition, point1);
    var projectedCircle = Vector.project(temp8, positionToProject, normal);

    var dp1 = Vector.dot(positionToProject, face);

    if(dp1 < 0)
    {
        var penetration = Vector.len(positionToProject) - radius;
        Vector.normalize(positionToProject, positionToProject)

        if(penetration < 0)
        {
             success(body1,
                    circle,
                    body2,
                    line,
                    penetration,
                    positionToProject)

        }
        else
        {
            fail(body1,
                 circle,
                 body2,
                 line);
        }

        return;
    }

    positionToProject = Vector.sub(temp7, localCirclePosition, point2);
    projectedCircle = Vector.project(temp8, positionToProject, normal);
    dp1 = Vector.dot(positionToProject, face);

    if(dp1 > 0)
    {
        var penetration = Vector.len(positionToProject) - radius;
        Vector.normalize(positionToProject, positionToProject)

        if(penetration < 0)
        {
            success(body1,
                    circle,
                    body2,
                    line,
                    penetration,
                    positionToProject)
            /// out //
        }
        else
        {

            fail(body1,
                 circle,
                 body2,
                 line);
        }

        return;
    }

    var penetration = Vector.len(projectedCircle) - radius;

    var projection = normal;//.clone(this.temp6);

    // what size?
    var s = ( point2.x - point1.x ) * ( localCirclePosition.y - point1.y) - (point2.y - point1.y) * (localCirclePosition.x - point1.x);
    s = (s > 0) ? 1 : -1;

    projection.x *= s;
    projection.y *= s;

    if(penetration < 0)
    {
        Vector.normalize(projection, projection);
        success(body1,
                circle,
                body2,
                line,
                penetration,
                projection)
    }


    fail(body1,
         circle,
         body2,
         line);

}
