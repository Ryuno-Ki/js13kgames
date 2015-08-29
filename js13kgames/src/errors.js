(function(global) {
    "use strict";
    var AbstractError, genericErrorHandler;

    genericErrorHandler = function genericErrorHandler(error) {};

    /**
     * To be parent object of my error objects.
     * Can be thrown, remedy is non-standard property.
     */
    AbstractError = {
        name: "AbstractError",
        message: "NotImplementedYet!",
        remedy: genericErrorHandler
    };
})(this);
