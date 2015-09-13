define("errors", [], function() {
    "use strict";
    var ConsumerElementError, ElectronicElementError, PowerSourceElementError;
    /**
     * Here I collect custom error objects. In the end I had to remove this feature due to size limitations
     *
     * @module errors
     */
    
    /**
     * In case a ConsumerElement is required but not passed, throw this error.
     *
     * @typedef ConsumerElementError
     * @type object
     * @property ConsumerElementError.name {string} name - What kind of error.
     * @property ConsumerElementError.message {string} message - A description of this error.
     * @property ConsumerElementError.toString {function} toString - Ensure the object is rendered properly.
     */
    ConsumerElementError = {
        name: "ConsumerElementError",
        message: "Must be an instance of ConsumerElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

    /**
     * In case a ElectronicElement is required but not passed, throw this error.
     *
     * @typedef ElectronicElementError
     * @type object
     * @property ElectronicElementError.name {string} name - What kind of error.
     * @property ElectronicElementError.message {string} message - A description of this error.
     * @property ElectronicElementError.toString {function} toString - Ensure the object is rendered properly.
     */
    ElectronicElementError = {
        name: "ElectronicElementError",
        message: "Must be an instance of ElectronicElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

    /**
     * In case a PowerSourceElement is required but not passed, throw this error.
     *
     * @typedef PowerSourceElementError
     * @type object
     * @property PowerSourceElementError.name {string} name - What kind of error.
     * @property PowerSourceElementError.message {string} message - A description of this error.
     * @property PowerSourceElementError.toString {function} toString - Ensure the object is rendered properly.
     */
    PowerSourceElementError = {
        name: "PowerSourceElementError",
        message: "Must be an instance of PowerSourceElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };
    return {
        ElectronicElementError: ElectronicElementError,
        PowerSourceElementError: PowerSourceElementError,
        ConsumerElementError: ConsumerElementError,
    };
});
/*
(function(global) {
    "use strict";
    var AbstractError, genericErrorHandler;

    genericErrorHandler = function genericErrorHandler(error) {};

    //
    // To be parent object of my error objects.
    // Can be thrown, remedy is non-standard property.
    //
    AbstractError = {
        name: "AbstractError",
        message: "NotImplementedYet!",
        remedy: genericErrorHandler
    };
})(this);
*/
