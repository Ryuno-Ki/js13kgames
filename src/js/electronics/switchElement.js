define(["app/element", "app/utils", "app/errors"], function(electronicElement, utils, errors) {
    "use strict";
    var SwitchElement,
        seProto;

    SwitchElement = function(name) {
        // Ensure being called with `new`
        if (!(this instanceof SwitchElement)) {
            return new SwitchElement(name);
        }

        // Private members
        var feature, called, that;

        SwitchElement.count += 1;
        that = this;
        that._name = name + '-' + SwitchElement.count;
        that._type = 'switch';
        that._closed = true;
        that._icon = 'switch';

        that._input = null;
        that._output = null;
    };
    seProto = SwitchElement.prototype;
    utils.inherit(SwitchElement, electronicElement.ElectronicElement);
    seProto.setInput = function(el) {
        this._input = el || null;
        // Using element.setOutput() yields an infinite loop
        el._output = this;
    };
    seProto.getInput = function() {
        return this._input;
    };
    seProto.hasInput = function() {
        return (typeof this._input !== "undefined") && (this._input !== null);
    };
    seProto.setOutput = function(element) {
        this._output = element || null;
        // Using element.setInput() yields an infinite loop
        element._input = this;
    };
    seProto.getOutput = function() {
        return this._output;
    };
    seProto.hasOutput = function() {
        return (typeof this._output !== "undefined") && (this._output !== null);
    };
    // Static methods
    SwitchElement.count = 0;
    seProto.isClosed = function() {
        return this._closed;
    };
    seProto.useSwitch = function() {
        this._closed = !this._closed;
    };

    return {
        SwitchElement: SwitchElement
    };
});
