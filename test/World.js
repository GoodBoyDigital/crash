'use strict';
var crash = require('../lib');
var Vector = crash.Vector;
var Body = crash.Body;


var chai = require('chai');

describe('Crash.World', function ()
{
    it('should create correctly', function ()
    {
        var world = new crash.World();


    //    chai.expect(body).to.be.instanceOf(Body);
    });

    it('sortAxisList should order items by x lower bound', function ()
    {
        var world = new crash.World();

        var circle1 = crash.Body.createCircle(30);
        circle1.position.x = 400;
        circle1.position.y = 100;

        var circle2 = crash.Body.createCircle(30);
        circle2.position.x = 600;
        circle2.position.y = 100;

        var circle3 = crash.Body.createCircle(30);
        circle3.position.x = 300;
        circle3.position.y = 100;

        world.add(circle1);
        world.add(circle2);
        world.add(circle3);

        var children = world.bodies.children;

        world.sortAxisList(children);

        chai.expect(children[0]).to.equal(circle3);
        chai.expect(children[1]).to.equal(circle1);
        chai.expect(children[2]).to.equal(circle2);
        //chai.expect(body.boundingBox.upper.y).to.closeTo(250, 0.00001);
    });

    it('getCollisions', function ()
    {
        var world = new crash.World();

        var circle1 = crash.Body.createCircle(30);
        circle1.position.x = 400;
        circle1.position.y = 100;

        var circle2 = crash.Body.createCircle(30);
        circle2.position.x = 600;
        circle2.position.y = 100;

        var circle3 = crash.Body.createCircle(30);
        circle3.position.x = 300;
        circle3.position.y = 100;

        world.add(circle1);
        world.add(circle2);
        world.add(circle3);

        var children = world.bodies.children;

        world.sortAxisList(children);

        chai.expect(children[0]).to.equal(circle3);
        chai.expect(children[1]).to.equal(circle1);
        chai.expect(children[2]).to.equal(circle2);
        //chai.expect(body.boundingBox.upper.y).to.closeTo(250, 0.00001);
    });

    it('sensor should not react', function ()
    {
        var world = new crash.World();

        var circle1 = crash.Body.createCircle(30);
        circle1.position.x = 200;
        circle1.position.y = 200;
        circle1.gravity = 0;

        var rectangle = crash.Body.createRectangle(40, 40);
        rectangle.type = crash.Body.STATIC;
        rectangle.position.x = 200;
        rectangle.position.y = 200;
        rectangle.gravity = 0;

        world.add(circle1);
        world.add(rectangle);

        var count = 0;

        world.onCollideBegin.add(function(data){
            count++;
            console.log("collide")
        })

        world.onCollideEnd.add(function(data){
             count++;
            console.log("collide end")
        })

        world.update();
       // world.update();


       // chai.expect(children[0]).to.equal(circle3);
       // chai.expect(children[1]).to.equal(circle1);
       // chai.expect(children[2]).to.equal(circle2);
        //chai.expect(body.boundingBox.upper.y).to.closeTo(250, 0.00001);
    });

});


