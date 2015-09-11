define(function() {
    "use strict";
    var ConsumerElementError, ElectronicElementError, PowerSourceElementError;

    ConsumerElementError = {
        name: "ConsumerElementError",
        message: "Must be an instance of ConsumerElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

    ElectronicElementError = {
        name: "ElectronicElementError",
        message: "Must be an instance of ElectronicElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

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
