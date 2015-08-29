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

        // Private members
        var feature, called;

        this._name = name;
        called = 0;

        // feature is truly private here
        // Doesn't work with Arrays and Objects (passed by reference!)
        feature = 'sizzles';
        this.getFeature = function() {
            return feature;
        };

        this.calledHowOften = function() {
            return called += 1;
        };
    };

    Element.prototype.getName = function() {
        return this._name;
    };
    ns.Element = Element;
})(this);
