'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;

var collisions = new Crash.Collisions();

var chai = require('chai');

describe('Crash.Collision', function ()
{
    it('AABB should collide with AABB correctly', function ()
    {
        var aabb1 = new Crash.AABB();
        var aabb2 = new Crash.AABB();
        var hit;

        aabb1.setRect(0, 0, 10, 10);
        aabb2.setRect(0, 0, 10, 10);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.true;

        ///

        aabb2.setRect(20, 0, 10, 10);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.false;

        ///

        aabb2.setRect(-20, 0, 10, 10);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.false;

        ///

        aabb2.setRect(5, 5, 10, 10);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.true;

        ///

        aabb2.setRect(5, -50, 10, 10);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.false;

        ///

        aabb2.setRect(5, -50, 10, 300);

        hit = collisions.aabbVaabb(aabb1, aabb2);

        chai.expect(hit).to.be.true;
    });

    it('body AABBs should overlap corretly', function ()
    {
        var tempAABB = new Crash.AABB();
        var tempAABB2 = new Crash.AABB();

        var body1 = new Crash.Body({shapes:[new Crash.Circle(100)]});
        var body2 = new Crash.Body({shapes:[new Crash.Circle(50)]});

        var bounds = body1.globalBounds(tempAABB)
        var bounds2 = body2.globalBounds(tempAABB2)

        var hit = collisions.aabbVaabb(bounds, bounds2);

        chai.expect(hit).to.be.true;

        body1.position.x = 100;
        body1.position.y = 400;

        var bounds = body1.globalBounds(tempAABB)
        var bounds2 = body2.globalBounds(tempAABB2)

        var hit = collisions.aabbVaabb(bounds, bounds2);

        chai.expect(hit).to.be.false;

    });

    it('circle should collide with circle correctly', function ()
    {

        var circleTest = function(r1, r2, p1, p2, pentration, direction){

            var body1 = new Crash.Body({shapes:[new Crash.Circle(r1)]});
            var body2 = new Crash.Body({shapes:[new Crash.Circle(r2)]});

            Vector.copy(body1.position, p1);
            Vector.copy(body2.position, p2);

            collisions.contacts = [];
            collisions.collide(body1, body2);

            var data = collisions.contacts[0];

            chai.expect(data.penetration).to.equal(pentration);
            chai.expect(data.direction).to.deep.equal(direction);
        }


        circleTest(100,
                   100,
                   Vector.create(0, 0),
                   Vector.create(0, 0),
                   -200,
                   Vector.create(0, 0))


        circleTest(100,
                   120,
                   Vector.create(0, 0),
                   Vector.create(200, 0),
                   -20,
                   Vector.create(1, 0))


        circleTest(100,
                   110,
                   Vector.create(200, 0),
                   Vector.create(0, 0),
                   -10,
                   Vector.create(-1, 0))

        circleTest(100,
                   110,
                   Vector.create(200, 100),
                   Vector.create(0, 0),
                   13.606797749978966,
                   Vector.create(-0.8944271909999159, -0.4472135954999579))


         circleTest(50,
                    30,
                    Vector.create(0, 0),
                    Vector.create(0, 30),
                    -50,
                    Vector.create(0, 1))




    });

    it('circle should collide with rectangle correctly', function ()
    {

    });

    it('circle should collide with rotated rectangle correctly', function ()
    {

    });

    it('circle should collide with line correctly', function ()
    {

    });

    it('rectangle should collide with rectangle correctly', function ()
    {

    });

    it('rectangle should collide with rotated rectangle correctly', function ()
    {

    });

});
