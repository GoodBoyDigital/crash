'use strict';
var crash = require('../lib');
var circleVline = require('../lib/collision/circleVLine').default;
var Vector = crash.Vector;
var Body = crash.Body;


var chai = require('chai');

describe('Crash.hitTests', function ()
{
    it('hit test a circle vs a line', function ()
    {

        var circle = Body.createCircle({}, 100, 0, 0);
        var line = Body.createLine({}, 100, 0, 0, Math.PI/2);

        circle.updateBounds();
        line.updateBounds();

        var positions = [
            [0, 0, 0, 0],
            [0, 0, 200, 200],
            [100, 0, 250, 200],
            [210, 220, 250, 250],
        ]

        var penetrations = [
            -100,
            null,
            null,
            -60.00000000000001,
        ]

        var positionsToProject = [
            {x: 1, y: -6.123233995736766e-17},
            null,
            null,
            { x: -1, y: 6.123233995736766e-17 }
        ]

        let count = 0
        for (var i = 0; i < positions.length; i++) {

            var d = positions[i];

            circle.position.x = d[0];
            circle.position.y = d[1];

            line.position.x = d[2];
            line.position.y = d[3];


            circleVline(circle,
                        circle.shapes[0],
                        line,
                        line.shapes[0],
                        (body1, circle, body2, line, penetration, positionToProject)=>{

                chai.expect(penetration).to.equal(penetrations[i]);
                chai.expect(positionToProject).to.deep.equal(positionsToProject[i]);

                count++

            }, ()=>{})

        }

        chai.expect(count).to.equal(2);




    });

});


