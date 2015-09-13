define("circuitElement", ["element", "utils"], function(electronicElement, utils) {
    "use strict";
    /**
     * This object represents an electronic circuit. It knows about its state and components.
     *
     * @module
     * @requires element
     * @requires utils
     */
    var CircuitElement,
        ceProto;

    /**
     * Constructor of a circuit.
     *
     * @constructor
     * @extends module:element~ElectronicElement
     */
    CircuitElement = function() {
        var that;
        that = this;
        that._input = null;
        that._type = 'circuit';
        that._parts = [];
    };
    utils.inherit(CircuitElement, electronicElement.ElectronicElement);
    ceProto = CircuitElement.prototype;

    /**
     * Mark an element as part of this circuit.
     *
     * @function
     * @name add
     * @this module:electronics/circuitElement~CircuitElement
     * @memberof module:electronics/circuitElement~CircuitElement.prototype
     * @param {module:element} element - The electronic element which should be added to the circuit
     * @returns {module:electronics/circuitElement~CircuitElement} this - The circuit object for chaining.
     */
    ceProto.add = function(element) { this._parts.push(element); return this; };

    /**
     * Determine, whether the circuit is currently closed.
     *
     * @function
     * @name isClosed
     * @this module:electronics/circuitElement~CircuitElement
     * @memberof module:electronics/circuitElement~CircuitElement.prototype
     * @returns {boolean} result - When closed 'true', otherwise 'false'
     */
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
