define(["utils"], function(utils) {
    "use strict";
    var ElectronicElement,
        eeProto;

    /**
     * Describes abstract parent class for all construction elements.
     */
    ElectronicElement = function ElectronicElement(name) {
        // Ensure being called with `new`
        if (!(this instanceof ElectronicElement)) {
            return new ElectronicElement(name);
        }

        // Private members
        var feature, called, that;

        that = this;
        ElectronicElement.count += 1;
        that._name = name + '-' + ElectronicElement.count;
        that._type = 'electronic';
    };
    // Static methods
    ElectronicElement.count = 0;
    // Instance methods
    eeProto = ElectronicElement.prototype;
    eeProto.getName = function() { return this._name; };
    eeProto.getType = function() { return this._type; };
    eeProto.setInput = function(element) {
        this._input = element || null;
        // Using element.setOutput() yields an infinite loop
        element._output = this;
    };
    eeProto.getInput = function() { return this._input; };
    eeProto.hasInput = function() { return (typeof this._input !== "undefined") && (this._input !== null); };
    eeProto.setOutput = function(element) {
        this._output = element || null;
        // Using element.setInput() yields an infinite loop
        element._input = this;
    };
    eeProto.getOutput = function() { return this._output; };
    eeProto.hasOutput = function() { return (typeof this._output !== "undefined") && (this._output !== null); };
    return {
        ElectronicElement: ElectronicElement,
    };
});
