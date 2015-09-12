define(["app/element", "app/errors"], function(ElectronicElement, errors) {
    "use strict";
    var PowerSourceElement,
        pseProto;

    PowerSourceElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof PowerSourceElement)) {
            return new PowerSourceElement(name);
        }

        PowerSourceElement.count += 1;
        that = this;
        that._name = name + '-' + PowerSourceElement.count;
        that._type = 'power-source';
        that._output = null;
    };
    pseProto = PowerSourceElement.prototype;
    pseProto.setOutput = function(element) {
        this._output = element || null;
        // Using element.setInput() yields an infinite loop
        element._input = this;
    };
    pseProto.getOutput = function() {
        return this._output;
    };
    pseProto.hasOutput = function() {
        return (typeof this._output !== "undefined") && (this._output !== null);
    };
    PowerSourceElement.count = 0;

    return {
        PowerSourceElement: PowerSourceElement,
    };
});
