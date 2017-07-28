import Body from './Body';
import Vector from './Vector';

const temp1 = Vector.create()
const temp2 = Vector.create()
const temp3 = Vector.create()
const temp4 = Vector.create()

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

            if(!collision.ignore && !collision.shape1.sensor && !collision.shape2.sensor)
            {
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

                    this.bounce(body2, body1, Vector.set(temp4, -projection.x, -projection.y))
                }

                var dx = projection.x * penetration;
                var dy = projection.y * penetration;

                body1.position.x -= dx * amount;
                body1.position.y -= dy * amount;

                body2.position.x += dx * amount2;
                body2.position.y += dy * amount2;


            }
        }
    }

    bounce(body1, body2, projection)
    {
        var collisionForce = Vector.sub(temp3, body1.velocity, body2.velocity);

        // this kind works!
        if(Vector.dot(collisionForce, projection ) > 0)
        {
            return;
        }

        // convert to 90 degs
        var perp = new Vector(projection.y, -projection.x);

        var frictionVector = Vector.project(temp1, collisionForce, perp);
        var projectionToLine2 = Vector.project(temp2, collisionForce, projection);

        var bounceVector = new Vector(0, 0);
        bounceVector.x = projection.x * Vector.len(projectionToLine2);
        bounceVector.y = projection.y * Vector.len(projectionToLine2);

        Vector.mul(frictionVector, frictionVector, body1.contactFriction);
        Vector.mul(bounceVector, bounceVector, body1.bounce);

        body1.velocity.x = (frictionVector.x + bounceVector.x);
        body1.velocity.y = (frictionVector.y + bounceVector.y);

    }
}

