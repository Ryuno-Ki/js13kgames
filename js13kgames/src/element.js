(function(global) {
    "use strict";
    var Element;

    /**
     * Describes abstract parent class for all construction elements.
     */
    Element = function(name) {
        if (!(this instanceof Element)) {
            return new Element();
        }
        this.name = name;
        this.called = 0;
    };

    Element.prototype.getName = function() {
        return this.name;
    };

    Element.prototype.calledHowOften = function() {
        return function() {
            return (this.called += 1);
        };
    };
})(this)
