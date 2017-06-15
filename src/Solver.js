import Body from './Body';
import Vector from './Vector';


export default class Solver
{
    constructor()
    {

    }

    solve(collsions)
    {
        for (var i = collsions.length - 1; i >= 0; i--)
        {
            const collision = collsions[i];

            const projection = collision.projection;
            const penetration = collision.penetration;
            const body1 = collision.body1;
            const body2 = collision.body2;

            var amount = 0.5;
            var amount2 = 0.5;

            if(body2.type === Body.STATIC)
            {
                amount = 1;
                amount2 = 0;

                this.bounce(body1, body2, projection)


            }
            else if(body1.type === Body.STATIC)
            {
                amount = 0;
                amount2 = 1;

                this.bounce(body2, body1, Vector.create(-projection.x, -projection.y))
            }

            var dx = projection.x * penetration;
            var dy = projection.y * penetration;

            body1.position.x -= dx * amount;
            body1.position.y -= dy * amount;

            body2.position.x += dx * amount2;
            body2.position.y += dy * amount2;
        }
    }

    bounce(body1, body2, projection)
    {
        var collisionForce = Vector.sub(Vector.create(), body1.velocity, body2.velocity);
        // convert to 90 degs
        var perp = new Vector(projection.y, -projection.x);

        var frictionVector = Vector.project(Vector.create(), collisionForce, perp);
        var projectionToLine2 = Vector.project(Vector.create(), collisionForce, projection);

        var bounceVector = new Vector(0, 0);
        bounceVector.x = projection.x * Vector.len(projectionToLine2);
        bounceVector.y = projection.y * Vector.len(projectionToLine2);

        Vector.mul(frictionVector, frictionVector, body1.friction);
        Vector.mul(bounceVector, bounceVector, body1.bounce);

        body1.velocity.x = (frictionVector.x + bounceVector.x);
        body1.velocity.y = (frictionVector.y + bounceVector.y);

    }
}

