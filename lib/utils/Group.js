"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = function () {
    function Group(children) {
        _classCallCheck(this, Group);

        this.children = children || [];
    }

    Group.prototype.add = function add(item) {
        var index = this.children.indexOf(item);
        if (index !== -1) return item;

        this.children.push(item);

        return item;
    };

    Group.prototype.remove = function remove(item) {
        var index = this.children.indexOf(item);

        if (index === -1) return null;

        this.children.splice(index, 1);

        return item;
    };

    Group.prototype.getIndex = function getIndex(item) {
        return this.children.indexOf(item);
    };

    Group.prototype.getItem = function getItem(index) {
        return this.children[index];
    };

    Group.prototype.run = function run(f, scope) {
        if (scope) {
            for (var i = 0; i < this.children.length; i++) {

                f.call(scope, this.children[i]);
            }
        } else {

            for (var i = 0; i < this.children.length; i++) {

                f(this.children[i]);
            }
        }
    };

    Group.prototype.empty = function empty() {
        this.children.length = 0;
    };

    return Group;
}();

exports.default = Group;
//# sourceMappingURL=Group.js.map