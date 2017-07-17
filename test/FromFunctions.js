'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;
var Body = Crash.Body;
var Circle = Crash.Circle;
var Line = Crash.Line;
var Rectangle = Crash.Rectangle;


var chai = require('chai');

describe('Crash.Body', function ()
{
    it('fromRectangle should return a rectangle ', function ()
    {
        var rectangle = Body.createRectangle({}, 10, 10, 0, 0);

        chai.expect(rectangle).to.be.instanceOf(Body);
        chai.expect(rectangle.shapes[0]).to.be.instanceOf(Rectangle);

    });

    it('fromLine should return a line', function ()
    {
        var line = Body.createLine({}, 10, 0, 0, 0);

        chai.expect(line).to.be.instanceOf(Body);
        chai.expect(line.shapes[0].start).to.deep.equal({x:-5, y:0});
        chai.expect(line.shapes[0].end).to.deep.equal({x:5, y:0});
        chai.expect(line.shapes[0]).to.be.instanceOf(Line);
    });

    it('fromCircle should return a circle', function ()
    {
        var circle = Body.createCircle({}, 10, 0, 0);

        chai.expect(circle).to.be.instanceOf(Body);
        chai.expect(circle.shapes[0]).to.be.instanceOf(Circle);
    });

});
