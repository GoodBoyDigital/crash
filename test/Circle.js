'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;


var chai = require('chai');

describe('Crash.Circle: ', function ()
{
    it('Circle should create correctly', function ()
    {
        var circle = new Crash.Circle(100);

        chai.expect(circle.radius).to.equal(100);
        chai.expect(circle.boundingBox.lower).to.deep.equal({x:-100, y:-100});
        chai.expect(circle.boundingBox.upper).to.deep.equal({x:100, y:100});

    });

    it('Circle should create correctly with position', function ()
    {
    	var circle = new Crash.Circle(100, Vector.create(30, 20));

        chai.expect(circle.radius).to.equal(100);
        chai.expect(circle.boundingBox.lower).to.deep.equal({x:-70, y:-80});
        chai.expect(circle.boundingBox.upper).to.deep.equal({x:130, y:120});
    });
});
