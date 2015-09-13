define("element", ["utils"], function(utils) {
    "use strict";
    /**
     * The basic electronic element blueprint used for inheritance by more specific ones.
     *
     * @module element
     * @requires utils
     */
    var ElectronicElement,
        eeProto;

    /**
     * Describes abstract parent class for all construction elements.
     *
     * @constructor ElectronicElement
     */
    ElectronicElement = function ElectronicElement() {
        this._type = 'electronic';
        ElectronicElement.count += 1;
    };

    /**
     * Holds a reference about how many instances were created. I originally used this to create unique names.
     *
     * @static
     * @name count
     */
    ElectronicElement.count = 0;

    // Instance methods
    eeProto = ElectronicElement.prototype;

    /**
     * Returns the type of this element. Used to determine, which methods to call.
     * @function
     * @name getType
     * @memberof module:element~ElectronicElement.prototype
     * @returns {string} type - The type of this element, i. e. 'electronic'
     */
    eeProto.getType = function() { return this._type; };

    /**
     * Bidirectional connects two electronic element by setting one as input of this and this as output of the other.
     *
     * @function
     * @name setInput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @param {module:element} element - Another electronic element or child object of it
     * @returns this
     */
    eeProto.setInput = function(element) {
        this._input = element || null;
        element._output = this;
        return this;
    };

    /**
     * Return the input element of this instance or null
     * 
     * @function
     * @name getInput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @returns {(module:element|null)} element - The element stored in input slot of this element.
     */
    eeProto.getInput = function() { return this._input; };

    /**
     * Checks whether this element already has an input slot (may save some heavy function calls.
     *
     * @function
     * @name hasInput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @returns {boolean} result - In case it is neither undefined nor null 'true', else 'false'
     */
    eeProto.hasInput = function() { return (typeof this._input !== "undefined") && (this._input !== null); };

    /**
     * Bidirectional connects two electronic element by setting one as output of this and this as input of the other.
     *
     * @function
     * @name setOutput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @param {module:element} element - Another electronic element or child object of it
     * @returns this
     * @todo Figure out, why calling setInput inside of here caused a circular dependency
     */
    eeProto.setOutput = function(element) {
        this._output = element || null;
        element._input = this;
        return this;
    };

    /**
     * Return the output element of this instance or null
     * 
     * @function
     * @name getOutput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @returns {(module:element|null)} element - The element stored in output slot of this element.
     */
    eeProto.getOutput = function() { return this._output; };

    /**
     * Checks whether this element already has an output slot (may save some heavy function calls.
     *
     * @function
     * @name hasOutput
     * @this module:element~ElectronicElement
     * @memberof module:element~ElectronicElement.prototype
     * @returns {boolean} result - In case it is neither undefined nor null 'true', else 'false'
     */
    eeProto.hasOutput = function() { return (typeof this._output !== "undefined") && (this._output !== null); };

    /**
     * @exports ElectronicElement
     */
    return {
        ElectronicElement: ElectronicElement,
    };
});
