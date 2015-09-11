define([], function() {
    "use strict";
    var extendDeep, inherit, mix;

    extendDeep = function(parent, child) {
        var prop, toStr, p;

        toStr = Object.prototype.toString;
        child = child || {};

        for (prop in parent) {
            if (parent.hasOwnProperty(prop)) {
                p = parent[prop];
                if (typeof p === "object") {
                    child[prop] = Array.isArray(p) ? [] : {};
                    extendDeep(p, child[prop]);
                } else {
                    child[prop] = parent[prop];
                }
            }
        }
        return child;
    };

    // Example: utils.inherit(KidConstructor, ParentConstructor)
    inherit = function() {
        var Proxy;
        Proxy = function() {};  // Temporary constructor, created only once
        return function(Child, Parent) {
            Proxy.prototype = Parent.prototype;
            Child.prototype = new Proxy();  // Only inherit prototype methods
            Child.superior = Parent.prototype;  // For access to the super class
            Child.prototype.constructor = Child;  // For introspection purposes
        };
    };

    mix = function() {
        var i, arg, len, prop, child;

        child = {};

        for (i = 0, len = arguments.length; i < len; i += 1) {
            arg = arguments[i];
            for (prop in arg) {
                if (arg.hasOwnProperty(prop)) {
                    child[prop] = arg[prop];
                }
            }
        }
        return child;
    };

    return {
        extendDeep: extendDeep,
        inherit: inherit,
        mix: mix,
    };
});
/*
(function(window) {
    'use strict';
    var ns, on, off, stop, namespace, klass, extend, extendDeep, mix;


    // Init time branching to determine implementation on first parsing
    on = function(el, type, fn) {
        if (typeof window.addEventListener === 'function') {
            on = function(el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else if (typeof document.attachEvent === 'function') { // IE
            on = function(el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
        } else { // Elder browser
            on = function(el, type, fn) {
                el['on' + type] = fn;
            };
        }
    };

    // Init time branching to determine implementation on first parsing
    off = function(el, type, fn) {
        if (typeof window.removeEventListener === 'function') {
            off = function(el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else if (typeof document.detachEvent === 'function') { // IE
            off = function(el, type, fn) {
                el.detachEvent('on' + type, fn);
            };
        } else { // Elder browser
            off = function(el, type, fn) {
                el['on' + type] = null;
            };
        }
    };

    // Stop events from bubbling up
    stop = function(event) {
        if (typeof event.preventDefault === "function") {
            event.preventDefault();
        }

        if (typeof event.stopPropagation === "function") {
            event.stopPropagation();
        }

        // IE
        if (typeof event.returnValue === "boolean") {
            event.returnValue = false;
        }

        if (typeof event.cancelBubble === "boolean") {
            event.cancelBubble = false;
        }
    };
    // Example: JS13KBP.utils.namespace('once.upon.a.time.there.was.this.long.nested.property');
    namespace = function(ns_string) {
        var parts, part, parent, i, len;

        parts = ns_string.split('.');
        parent = 'JS13KBP';

        // Remove leading namespace when redundant
        if (parts[0] === parent) {
            parts = parts.slice(1);
        }

        for (i = 0, len = parts.length; i < len; i += 1) {
            // Create property if undefined
            part = parts[i];
            if (typeof parent[part] === 'undefined') {
                parent[part] = {};
            }
            parent = parent[part];
        }
        return window.parent;
    };


    klass = function(Parent, properties) {
        var Child, prop;

        // new constructor
        Child = function() {
            // _construct can be key in properties and shall be a function assigning arguments of new operator to this
            if (Child.superior && Child.superior.hasOwnProperty("_construct")) {
                Child.superior._cunstruct.apply(this, arguments);
            }
            if (Child.prototype.hasOwnProperty("_construct")) {
                Child.prototype._construct.apply(this, arguments);
            }
        };

        // inherit
        Parent = Parent || Object;
        inherit(Child, Parent);

        // add methods
        for (prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                Child.prototype[prop] = properties[prop];
            }
        }

        // return "class"
        return Child;
    };

    // Flat copy of properties, whitout walking down objects, but copying references
    extend = function(parent, child) {
        var prop;
        child = child || {};
        for (prop in parent) {
            if (parent.hasOwnProperty(prop)) {
                child[prop] = parent[prop];
            }
        }
    };


    // Mix several objects into a compounded one
    // Example: var cake = mix({eggs: 2, large: true}, {sugar: "sure!"});
    mix = function() {
        var i, arg, len, prop, child;

        child = {};

        for (i = 0, len = arguments.length; i < len; i += 1) {
            arg = arguments[i];
            for (prop in arg) {
                if (arg.hasOwnProperty(prop)) {
                    child[prop] = arg[prop];
                }
            }
        }

        return child;
    };

    window.JS13KBP = window.JS13KBP || {};

    // API
    ns = window.JS13KBP;
    ns.utils = {
        on: on,
        off: off,
        stop: stop,
        namespace: namespace,
        inherit: inherit,
        klass: klass,
        extend: extend,
        extendDeep: extendDeep,
        mix: mix
    };
    return ns;
})(this);
*/
