'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;


var chai = require('chai');

describe('Crash.Rectangle: ', function ()
{
    it(' should create correctly', function ()
    {
        var rect = new Crash.Rectangle(100, 200);

        chai.expect(rect.type).to.equal(Crash.Shape.RECTANGLE);

        chai.expect(rect.width).to.equal(100);
        chai.expect(rect.height).to.equal(200);
        chai.expect(rect.boundingBox.lower).to.deep.equal({x:-50, y:-100});
        chai.expect(rect.boundingBox.upper).to.deep.equal({x:50, y:100});

    });

    it(' should create correctly with position', function ()
    {
        var rect = new Crash.Rectangle(100, 200, Vector.create(30, 20));

        chai.expect(rect.width).to.equal(100);
        chai.expect(rect.height).to.equal(200);
        chai.expect(rect.boundingBox.lower).to.deep.equal({x:-20, y:-80});
        chai.expect(rect.boundingBox.upper).to.deep.equal({x:80, y:120});

    });

    it(' bounds should be correct if rotated at 90 degree angle', function ()
    {
        // 360
        var rectangle = new Crash.Rectangle(100, 200, Vector.create(10, 10), Math.PI * 2);

        chai.expect(rectangle.boundingBox.width).to.closeTo(100, 0.00001);
        chai.expect(rectangle.boundingBox.height).to.closeTo(200, 0.00001);

        // 90
        var rectangle = new Crash.Rectangle(100, 200, Vector.create(), Math.PI * 0.5);

        chai.expect(rectangle.boundingBox.width).to.closeTo(200, 0.00001);
        chai.expect(rectangle.boundingBox.height).to.closeTo(100, 0.00001);

        // 270
        var rectangle = new Crash.Rectangle(100, 200, Vector.create(), Math.PI * 1.5);

        chai.expect(rectangle.boundingBox.width).to.closeTo(200, 0.00001);
        chai.expect(rectangle.boundingBox.height).to.closeTo(100, 0.00001);

        chai.expect(rectangle.boundingBox.lower.x).to.closeTo(-100, 0.00001);
        chai.expect(rectangle.boundingBox.lower.y).to.closeTo(-50, 0.00001);

        chai.expect(rectangle.boundingBox.upper.x).to.closeTo(100, 0.00001);
        chai.expect(rectangle.boundingBox.upper.y).to.closeTo(50, 0.00001);

    });

    it(' bounds should be correct if rotated at 90 degree angle with position', function ()
    {
        var rectangle = new Crash.Rectangle(100, 200, Vector.create(20, 10), Math.PI * 1.5);

        chai.expect(rectangle.boundingBox.lower.x).to.closeTo(-80, 0.00001);
        chai.expect(rectangle.boundingBox.lower.y).to.closeTo(-40, 0.00001);

        chai.expect(rectangle.boundingBox.upper.x).to.closeTo(120, 0.00001);
        chai.expect(rectangle.boundingBox.upper.y).to.closeTo(60, 0.00001);
    });

    it(' bounds should be correct if rotated at non 90 degree angle', function ()
    {
        var rectangle = new Crash.Rectangle(100, 100, Vector.create(), 45 * (Math.PI / 180) );

        var maxlen = Vector.length(Vector.create(100, 100));

        chai.expect(rectangle.boundingBox.width).to.closeTo(maxlen, 1);
        chai.expect(rectangle.boundingBox.height).to.closeTo(maxlen, 1);



    });

    it(' bounds should be correct if rotated at non 90 degree angle with position', function ()
    {
        var rectangle = new Crash.Rectangle(100, 100, Vector.create(20, 10), 45 * (Math.PI / 180) );

        var maxlen = Vector.length(Vector.create(100, 100));

        chai.expect(rectangle.boundingBox.width).to.closeTo(maxlen, 1);
        chai.expect(rectangle.boundingBox.height).to.closeTo(maxlen, 1);

        chai.expect(rectangle.boundingBox.lower.x).to.closeTo(-maxlen/2 + 20, 0.00001);
        chai.expect(rectangle.boundingBox.lower.y).to.closeTo(-maxlen/2 + 10, 0.00001);

        chai.expect(rectangle.boundingBox.upper.x).to.closeTo(maxlen/2 + 20, 0.00001);
        chai.expect(rectangle.boundingBox.upper.y).to.closeTo(maxlen/2 + 10, 0.00001);
    });

});
