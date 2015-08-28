(function(global) {
    "use strict";
    var Element;

    /**
     * Describes abstract parent class for all construction elements.
     */
    Element = function(name) {
        // Ensure being called with `new`
        if (!(this instanceof Element)) {
            return new Element();
        }

        var feature;

        this.name = name;
        this.called = 0;

        // feature is truly private here
        // Doesn't work with Arrays and Objects (passed by reference!)
        feature = 'sizzles';
        this.getFeature = function() {
            return feature;
        };
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
