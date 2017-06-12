'use strict';

define(function (require, exports, module) {
    var PIXI = require('PIXI');
    var Vector = require('fido/game/crash/Vector');

    var CollisionTests = function CollisionTests() {};

    CollisionTests.hitTest = function (item, group, hitFunction, missFunction) {
        var itemsToHitTest = group.children;

        for (var i = 0; i < itemsToHitTest.length; i++) {
            CollisionTests.hitTestAABBAABB(item, itemsToHitTest[i], hitFunction, missFunction);
        };
    };

    CollisionTests.hitTestAABBAABB = function (item, item2, hitFunction, missFunction) {
        var rect1 = item.hitArea;
        var rect2 = item2.hitArea;

        var p1x = rect1.x + item.position.x;
        var p1y = rect1.y + item.position.y;

        var p2x = rect2.x + item2.position.x;
        var p2y = rect2.y + item2.position.y;

        var topDist = p1y + rect1.height - p2y;
        var bottomDist = p2y + rect2.height - p1y;

        var leftDist = p1x + rect1.width - p2x;
        var rightDist = p2x + rect2.width - p1x;

        var dist = 999999;

        if (leftDist < dist) dist = leftDist;
        if (rightDist < dist) dist = rightDist;
        if (topDist < dist) dist = topDist;
        if (bottomDist < dist) dist = bottomDist;

        if (dist > 0) {

            // hit!
            var penetrationLine = new Vector();

            if (dist == leftDist) {
                penetrationLine.x = -1;
                penetrationLine.y = 0;
            } else if (dist == rightDist) {
                penetrationLine.x = 1;
                penetrationLine.y = 0;
            } else if (dist == topDist) {
                penetrationLine.x = 0;
                penetrationLine.y = -1;
            } else if (dist == bottomDist) {
                penetrationLine.x = 0;
                penetrationLine.y = 1;
            }

            var penetration = -dist;

            if (hitFunction) hitFunction(item, item2, penetration, penetrationLine);

            return true;
            //item.collisonReaction();
        } else {
            if (missFunction) missFunction(item, item2);

            return false;
        }
    };

    module.exports = CollisionTests;
});
//# sourceMappingURL=CollisionsTests.js.map