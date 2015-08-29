(function(global) {
    "use strict";
    var ns, Element;

    // FIMXE: Move to namespace utility
    if (typeof global.JS13KBP === "undefined") {
        global.JS13KBP = {};
    }
    if (typeof global.JS13KBP.element === "undefined") {
        global.JS13KBP.element = {};
    }
    ns = global.JS13KBP.element;

    /**
     * Describes abstract parent class for all construction elements.
     */
    Element = function Element(name) {
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
    ns.Element = Element;
})(this)
