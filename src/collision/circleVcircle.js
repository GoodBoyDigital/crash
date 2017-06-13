
import Vector from '../Vector';

export default function circleVcircle(body1, circle1, body2, circle2, success, fail)
{
    const px = body1.position.x + circle1.position.x;
    const py = body1.position.y + circle1.position.y;

    const px2 = body2.position.x + circle2.position.x;
    const py2 = body2.position.y + circle2.position.y;

    const dx = px - px2;
    const dy = py - py2;

    const dist = Math.sqrt(dx * dx + dy * dy);

    const penetration = dist - (circle1.radius + circle2.radius);

    if(penetration < 0)
    {
        // TODO pooling..
        success(body1,
                circle1,
                body2,
                circle2,
                penetration,
                Vector.create(dx/dist,dy/dist))
    }
    else
    {
        fail(body1,
             circle1,
             body2,
             circle2);
    }
}
