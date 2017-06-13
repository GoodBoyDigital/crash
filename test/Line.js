'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;


var chai = require('chai');

describe('Crash.Line: ', function ()
{
    it(' should create correctly', function ()
    {
        var line = new Crash.Line(100, Vector.create(), 0);

        chai.expect(line.type).to.equal(Crash.Shape.LINE);

        chai.expect(line.start).to.deep.equal({x:-50, y:0});
        chai.expect(line.end).to.deep.equal({x:50, y:0});

        chai.expect(line.boundingBox.lower).to.deep.equal({x:-50, y:0});
        chai.expect(line.boundingBox.upper).to.deep.equal({x:50, y:0});

    });

    it(' bounds should be correct if rotated', function ()
    {
        var line = new Crash.Line(100, Vector.create(), Math.PI * 2);

        chai.expect(line.start.x).to.closeTo(-50, 0.00001);
        chai.expect(line.start.y).to.closeTo(0, 0.00001);

        chai.expect(line.end.x).to.closeTo(50, 0.00001);
        chai.expect(line.end.y).to.closeTo(0, 0.00001);

        chai.expect(line.boundingBox.width).to.closeTo(100, 0.00001);
        chai.expect(line.boundingBox.height).to.closeTo(0, 0.00001);

        chai.expect(line.boundingBox.lower.x).to.closeTo(-50, 0.00001);
        chai.expect(line.boundingBox.lower.y).to.closeTo(0, 0.00001);

        chai.expect(line.boundingBox.upper.x).to.closeTo(50, 0.00001);
        chai.expect(line.boundingBox.upper.y).to.closeTo(0, 0.00001);
        ///
        ///
        ///

        var line = new Crash.Line(100, Vector.create(), Math.PI * 0.5);

        chai.expect(line.start.x).to.closeTo(0, 0.00001);
        chai.expect(line.start.y).to.closeTo(-50, 0.00001);

        chai.expect(line.end.x).to.closeTo(0, 0.00001);
        chai.expect(line.end.y).to.closeTo(50, 0.00001);

        chai.expect(line.boundingBox.width).to.closeTo(0, 0.00001);
        chai.expect(line.boundingBox.height).to.closeTo(100, 0.00001);


        ///
        ///
        ///

        var line = new Crash.Line(100, Vector.create(), Math.PI * -0.5);

        chai.expect(line.start.x).to.closeTo(0, 0.00001);
        chai.expect(line.start.y).to.closeTo(50, 0.00001);

        chai.expect(line.end.x).to.closeTo(0, 0.00001);
        chai.expect(line.end.y).to.closeTo(-50, 0.00001);

        chai.expect(line.boundingBox.width).to.closeTo(0, 0.00001);
        chai.expect(line.boundingBox.height).to.closeTo(100, 0.00001);


        ///
        ///
        ///

        var line = new Crash.Line(100, Vector.create(), Math.PI * -0.25);

        chai.expect(line.start.x).to.closeTo(-35, 1);
        chai.expect(line.start.y).to.closeTo(35, 1);

        chai.expect(line.end.x).to.closeTo(35, 1);
        chai.expect(line.end.y).to.closeTo(-35, 1);

        chai.expect(line.boundingBox.width).to.closeTo(70, 1);
        chai.expect(line.boundingBox.height).to.closeTo(70, 1);


    });

    it(' bounds should be correct if rotated with position', function ()
    {
        var line = new Crash.Line(100, Vector.create(20, 10), Math.PI * -0.25);

        chai.expect(line.start.x).to.closeTo(-35, 1);
        chai.expect(line.start.y).to.closeTo(35, 1);

        chai.expect(line.end.x).to.closeTo(35, 1);
        chai.expect(line.end.y).to.closeTo(-35, 1);

        chai.expect(line.boundingBox.width).to.closeTo(70, 1);
        chai.expect(line.boundingBox.height).to.closeTo(70, 1);

        chai.expect(line.boundingBox.lower.x).to.closeTo(-35 + 20, 1);
        chai.expect(line.boundingBox.lower.y).to.closeTo(-35 + 10, 1);

        chai.expect(line.boundingBox.upper.x).to.closeTo(35 + 20, 1);
        chai.expect(line.boundingBox.upper.y).to.closeTo(35 + 10, 1);
    })

});
