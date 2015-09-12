define(["app/element", "app/utils", "app/errors"], function(electronicElement, utils, errors) {
    "use strict";
    var ConsumerElement,
        ceProto;

    ConsumerElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof ConsumerElement)) {
            return new ConsumerElement(name);
        }

        ConsumerElement.count += 1;

        that = this;
        that._name = name + '-' + ConsumerElement.count;
        that = this;
        that._type = 'consumer';
        that._input = null;
    };
    ceProto = ConsumerElement.prototype;
    utils.inherit(ConsumerElement, electronicElement.ElectronicElement);
    ceProto.setInput = function(el) {
        this._input = el || null;
        // Using element.setOutput() yields an infinite loop
        el._output = this;
    };
    ceProto.getInput = function() {
        return this._input;
    };
    ceProto.hasInput = function() {
        return (typeof this._input !== "undefined") && (this._input !== null);
    };
    ConsumerElement.count = 0;

    return {
        ConsumerElement: ConsumerElement,
    };
});
