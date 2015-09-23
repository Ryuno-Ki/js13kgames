define(function() {
    "use strict";
    /**
     * Collect useful utilities here. Due to size limitations I had to stripped most of them.
     *
     * @module
     */
    var inherit;

    /**
     * Shorthand for inheriting from another constructor.
     *
     * @function
     * @name inherit
     * @param {constructor} Child - This constructor inherits
     * @param {constructor} Parent - The constructor to inherit from
     * @returns {constructor} Child - An augmented Child constructor
     */
    inherit = function(Child, Parent) {
        var Proxy;
        Proxy = function() {};  // Temporary constructor, created only once
        return (function(Child, Parent) {
            Proxy.prototype = Parent.prototype;
            Child.prototype = new Proxy();  // Only inherit prototype methods
            Child.superior = Parent.prototype;  // For access to the super class
            Child.prototype.constructor = Child;  // For introspection purposes
        })(Child, Parent);
    };
    return {
        inherit: inherit
    };
});
