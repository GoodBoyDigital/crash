'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;


var chai = require('chai');

describe('Crash.Vector', function ()
{
    it('should create correctly', function ()
    {
        var v = new Vector(100, 50);
        chai.expect(v.x).to.equal(100);
        chai.expect(v.y).to.equal(50);

    });

    it('should add correctly', function ()
    {
        var v1 = new Vector(100, 100);
        var v2 = new Vector(100, 100);

        var out = new Vector();

        Vector.add(out, v1, v2);

        chai.expect(out.x).to.equal(200);
        chai.expect(out.y).to.equal(200);
    });

    it('should sub correctly', function ()
    {
        var v1 = new Vector(100, 100);
        var v2 = new Vector(100, 100);

        var out = new Vector();

        Vector.sub(out, v1, v2);

        chai.expect(out.x).to.equal(0);
        chai.expect(out.y).to.equal(0);
    });

    it('should normalize correctly', function ()
    {
        var v1 = new Vector(0, 100);

        var out = new Vector();

        Vector.normalize(out, v1);

        chai.expect(out.x).to.equal(0);
        chai.expect(out.y).to.equal(1);
    });

    it('should rotate correctly', function ()
    {
        var v1 = new Vector(0, 100);

        var out = new Vector();

        Vector.rotate(out, v1, Math.PI * 0.5);

        chai.expect(out.x).to.equal(-100);
        chai.expect(out.y).to.closeTo(0, 0.00001);
    });

    it('should project correctly', function ()
    {
        var v1 = new Vector(0, 100);
        var v2 = new Vector(200, 100);

        var out = new Vector();

        Vector.project(out, v1, v2);

        chai.expect(out.x).to.equal(40);
        chai.expect(out.y).to.equal(20);
    });
});
