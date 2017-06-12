'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;
var Body = Crash.Body;


var chai = require('chai');

describe('Crash.Body', function ()
{
    it('should create correctly', function ()
    {
        var body = new Body();

        chai.expect(body).to.be.instanceOf(Body);
    });

    it('should add shape correctly', function ()
    {
        var body = new Body();
        var circle = new Crash.Circle(100);

        body.addShape(circle);

        body.updateBounds();

        chai.expect(body.boundingBox.lower.x).to.closeTo(-100, 0.00001);
        chai.expect(body.boundingBox.lower.y).to.closeTo(-100, 0.00001);

        chai.expect(body.boundingBox.upper.x).to.closeTo(100, 0.00001);
        chai.expect(body.boundingBox.upper.y).to.closeTo(100, 0.00001);


        var body = new Body();
        var rect = new Crash.Rectangle(100, 100, Vector.create(10, 20));

        body.addShape(rect);

        body.updateBounds();

        chai.expect(body.boundingBox.lower.x).to.closeTo(-50 + 10, 0.00001);
        chai.expect(body.boundingBox.lower.y).to.closeTo(-50 + 20, 0.00001);

        chai.expect(body.boundingBox.upper.x).to.closeTo(50 + 10, 0.00001);
        chai.expect(body.boundingBox.upper.y).to.closeTo(50 + 20, 0.00001);

    });



    it('should have correct bounds with multiple shape', function ()
    {
        var body = new Body();
        var circle = new Crash.Circle(100);
        var rect = new Crash.Rectangle(100, 100, Vector.create(200, 20));

        body.addShape(circle);
        body.addShape(rect);


        body.updateBounds();

        chai.expect(body.boundingBox.lower.x).to.closeTo(-100, 0.00001);
        chai.expect(body.boundingBox.lower.y).to.closeTo(-100, 0.00001);

        chai.expect(body.boundingBox.upper.x).to.closeTo(250, 0.00001);
        chai.expect(body.boundingBox.upper.y).to.closeTo(100, 0.00001);


        var line = new Crash.Line(100, Vector.create(0, 0), Math.PI);
        body.addShape(line);

        body.updateBounds();

        chai.expect(body.boundingBox.lower.x).to.closeTo(-100, 0.00001);
        chai.expect(body.boundingBox.lower.y).to.closeTo(-100, 0.00001);

        chai.expect(body.boundingBox.upper.x).to.closeTo(250, 0.00001);
        chai.expect(body.boundingBox.upper.y).to.closeTo(100, 0.00001);

        var line = new Crash.Line(500, Vector.create(0, 0), Math.PI * 0.5);
        body.addShape(line);

        body.updateBounds();

        chai.expect(body.boundingBox.lower.x).to.closeTo(-100, 0.00001);
        chai.expect(body.boundingBox.lower.y).to.closeTo(-250, 0.00001);

        chai.expect(body.boundingBox.upper.x).to.closeTo(250, 0.00001);
        chai.expect(body.boundingBox.upper.y).to.closeTo(250, 0.00001);
    });

});
