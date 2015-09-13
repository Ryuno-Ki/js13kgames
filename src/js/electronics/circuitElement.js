define(["element", "utils"], function(electronicElement, utils) {
    "use strict";
    var CircuitElement,
        ceProto;

    CircuitElement = function(name) {
        var that;
        // Ensure being called with `new`
        if (!(this instanceof CircuitElement)) {
            return new CircuitElement(name);
        }
        that = this;
        that.name = "CircuitElement";
        that._input = null;
        that._type = 'circuit';
        that._elements = [];
    };
    utils.inherit(CircuitElement, electronicElement.ElectronicElement);
    ceProto = CircuitElement.prototype;
    ceProto.hasSource = function(type) {
        return this._elements.map(function(el) { return el.getType(); }).indexOf(type) !== -1;
    };
    ceProto.add = function(element) { this._elements.push(element); return this; }
    ceProto.isCircuitClosed = function() {
        var that, closedElements;

        that = this;
        if (!(that.has("power-source") && that.has("consumer") && that.has("switch"))) { return false; }

        // Map ElectronicElement instances to Array of booleans according to their isClosed
        closedElements = (function() {
            return  this._elements.map(function(el) {
                var result, type;
                result = false;
                type = el.getType();

                if (type === "power-source") {
                    return el.hasOutput() && (el.getOutput() !== null);
                } else {
                    result = el.hasInput() && (el.getInput() !== null);
                    if (type === "electronic" || type === "switch") {
                        result = result && el.hasOutput() && (el.getOutput() !== null);
                        if (type === "switch") {
                            result = result && el.isClosed();
                        }
                    }
                }
                return result;
            });
        })();
    
        // Concat every isClosed() return value
        return closedElements.reduce(function(current, former) {
            return current && former;
        });
    };
    return {
        CircuitElement: CircuitElement,
    }
});
