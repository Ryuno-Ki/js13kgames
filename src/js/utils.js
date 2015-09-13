define(function() {
    "use strict";
    var inherit;
    // Example: utils.inherit(KidConstructor, ParentConstructor)
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
