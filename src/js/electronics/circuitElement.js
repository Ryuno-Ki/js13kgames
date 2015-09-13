define(["element", "utils"], function(electronicElement, utils) {
    "use strict";
    var CircuitElement,
        ceProto;

    CircuitElement = function() {
        var that;
        that = this;
        that._input = null;
        that._type = 'circuit';
        that._parts = [];
    };
    utils.inherit(CircuitElement, electronicElement.ElectronicElement);
    ceProto = CircuitElement.prototype;
    ceProto.add = function(element) { this._parts.push(element); return this; };
    ceProto.isClosed = function() {
        var closedElements;
        // Map ElectronicElement instances to Array of booleans according to their isClosed
        return (function(context) {
            return  context._parts.map(function(el) {
                var result, type;
                result = false;
                type = el.getType();

                if (type === "power-source") {
                    return el.hasOutput() && (el.getOutput() !== null);
                } else {
                    result = el.hasInput() && (el.getInput() !== null);
                    if (type === "switch") {
                        result = result && el.hasOutput() && (el.getOutput() !== null) && el.isClosed();
                    }
                }
                return result;
            });
        }(this)).reduce(function(current, former) {
            return current && former;
        });
    };
    return {
        CircuitElement: CircuitElement,
    }
});
