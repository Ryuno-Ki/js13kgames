(function(global) {
    "use strict";
    var Element;

    /**
     * Describes abstract parent class for all construction elements.
     */
    Element = function(name) {
        this.name = name;
    };

    Element.prototype.getName = function() {
        return this.name;
    };
})(this)
