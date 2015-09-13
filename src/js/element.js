define(["utils"], function(utils) {
    "use strict";
    var ElectronicElement,
        eeProto;

    /**
     * Describes abstract parent class for all construction elements.
     */
    ElectronicElement = function ElectronicElement() {
        ElectronicElement.count += 1;
    };
    // Static methods
    ElectronicElement.count = 0;
    // Instance methods
    eeProto = ElectronicElement.prototype;
    eeProto.getType = function() { return this._type; };
    eeProto.setInput = function(element) {
        this._input = element || null;
        element._output = this;
        return this;
    };
    eeProto.getInput = function() { return this._input; };
    eeProto.hasInput = function() { return (typeof this._input !== "undefined") && (this._input !== null); };
    eeProto.setOutput = function(element) {
        this._output = element || null;
        element._input = this;
        return this;
    };
    eeProto.getOutput = function() { return this._output; };
    eeProto.hasOutput = function() { return (typeof this._output !== "undefined") && (this._output !== null); };
    return {
        ElectronicElement: ElectronicElement,
    };
});
