"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = function () {
    function Group(children) {
        _classCallCheck(this, Group);

        this.children = children || [];
    }

    _createClass(Group, [{
        key: "add",
        value: function add(item) {
            var index = this.children.indexOf(item);
            if (index !== -1) return item;

            this.children.push(item);

            return item;
        }
    }, {
        key: "remove",
        value: function remove(item) {
            var index = this.children.indexOf(item);

            if (index === -1) return null;

            this.children.splice(index, 1);

            return item;
        }
    }, {
        key: "getIndex",
        value: function getIndex(item) {
            return this.children.indexOf(item);
        }
    }, {
        key: "getItem",
        value: function getItem(index) {
            return this.children[index];
        }
    }, {
        key: "run",
        value: function run(f, scope) {
            if (scope) {
                for (var i = 0; i < this.children.length; i++) {

                    f.call(scope, this.children[i]);
                }
            } else {

                for (var i = 0; i < this.children.length; i++) {

                    f(this.children[i]);
                }
            }
        }
    }, {
        key: "empty",
        value: function empty() {
            this.children.length = 0;
        }
    }]);

    return Group;
}();

exports.default = Group;
//# sourceMappingURL=Group.js.map