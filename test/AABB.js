'use strict';
var Crash = require('../lib');
var Vector = Crash.Vector;
var Body = Crash.Body;
var AABB = Crash.AABB;


var chai = require('chai');

describe('Crash.AABB', function ()
{
    it('should create correctly', function ()
    {
        var aabb = new AABB();

        chai.expect(aabb).to.be.instanceOf(AABB);
        chai.expect(aabb.width).to.equal(0);
        chai.expect(aabb.height).to.equal(0);
    });

    it('should update from correctly', function ()
    {
        var aabb = new AABB(-10, -10, 10, 10);

        chai.expect(aabb.lower.x).to.equal(-10);
        chai.expect(aabb.lower.y).to.equal(-10);

        chai.expect(aabb.upper.x).to.equal(10);
        chai.expect(aabb.upper.y).to.equal(10);

        aabb.set(-100, -50, 100, 50);

        chai.expect(aabb.lower.x).to.equal(-100);
        chai.expect(aabb.lower.y).to.equal(-50);

        chai.expect(aabb.upper.x).to.equal(100);
        chai.expect(aabb.upper.y).to.equal(50);

    });

    it('should update from rectangle correctly', function (done)
    {
        var aabb = new AABB(-10, -10, 10, 10);

        aabb.setRect(10, 10, 30, 30);

        chai.expect(aabb.lower.x).to.equal(10);
        chai.expect(aabb.lower.y).to.equal(10);

        chai.expect(aabb.upper.x).to.equal(40);
        chai.expect(aabb.upper.y).to.equal(40);

        chai.expect(aabb.width).to.equal(30);
        chai.expect(aabb.height).to.equal(30);
    });

});
