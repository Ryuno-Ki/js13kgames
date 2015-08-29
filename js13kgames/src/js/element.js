(function(window) {
    "use strict";
    var ns, ElectronicElement, SwitchElement, circuitIsClosed, renderCircuitLogic;

    // FIXME: Use utils module!
    var inherit;

    /**
     * Describes abstract parent class for all construction elements.
     */
    ElectronicElement = function ElectronicElement(name) {
        // Ensure being called with `new`
        if (!(this instanceof ElectronicElement)) {
            return new ElectronicElement(name);
        }

        // Private members
        var feature, called;

        ElectronicElement.count += 1;
        this._name = name + '-' + ElectronicElement.count;
        this._type = 'element';

        // feature is truly private here
        // Doesn't work with Arrays and Objects (passed by reference!)
        feature = 'sizzles';
        this.getFeature = function() {
            return feature;
        };
    };

    // Static methods
    ElectronicElement.count = 0;

    // Instance methods
    ElectronicElement.prototype.getName = function() {
        return this._name;
    };

    ElectronicElement.prototype.getType = function() {
        return this._type;
    };

    ElectronicElement.prototype.renderSelf = function(node) {
        var img;

        img = "<img src='build/" + this._icon + "' alt='" + this._type + ": " + this._name + "' />";
        node.innerHTML += img;
    };

    // FIXME: Use utils.inherit!
    inherit = (function() {
        var Proxy;
        Proxy = function() {};  // Temporary constructor, created only once
        return function(Child, Parent) {
            Proxy.prototype = Parent.prototype;
            Child.prototype = new Proxy();  // Only inherit prototype methods
            Child.superior = Parent.prototype;  // For access to the super class
            Child.prototype.constructor = Child;  // For introspection purposes
        };
    })();

    SwitchElement = function(name) {
        // Ensure being called with `new`
        if (!(this instanceof SwitchElement)) {
            return new SwitchElement(name);
        }

        // Private members
        var feature, called;

        SwitchElement.count += 1;
        this._name = name + '-' + SwitchElement.count;
        this._type = 'switch';
        this._state = 'closed';
        this._icon = 'switch';

        this._input = null;
        this._output = null;
    };

    inherit(SwitchElement, ElectronicElement);
    // Static methods
    SwitchElement.count = 0;

    SwitchElement.prototype.isClosed = function() {
        return this._state === 'closed';
    };

    SwitchElement.prototype.renderSelf = function(node) {
        var img;

        img = "<img src='build/" + this._icon + "-" + this._state + ".svg' ";
        img += "alt='" + this._type + "-" + this._state + ": " + this._name + "' />";
        node.innerHTML += img;
    };

    SwitchElement.prototype.setInput = function(element) {
        if (!(element instanceof ElectronicElement)) {
            // TODO: Move into errors.js
            throw {
                name: "ElectronicElementError",
                message: "Must be an instance of ElectronicElement!",
                toString: function() {
                    return this.name + ": " + this.message;
                }
            };
        }
        this._input = element;
    };

    SwitchElement.prototype.getInput = function() {
        return this._input;
    };

    SwitchElement.prototype.setOutput = function(element) {
        if (!(element instanceof ElectronicElement)) {
            // TODO: Move into errors.js
            throw {
                name: "ElectronicElementError",
                message: "Must be an instance of ElectronicElement!",
                toString: function() {
                    return this.name + ": " + this.message;
                }
            };
        }
        this._output = element;
    };

    SwitchElement.prototype.getOutput = function() {
        return this._output;
    };

    circuitIsClosed = function(elements) {
        var closedElements, isClosed;

        // Map ElectronicElement instances to Array of booleans according to their isClosed
        closedElements = elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw {
                    name: "ElectronicElementError",
                    message: "Must be an instance of ElectronicElement!",
                    toString: function() {
                        return this.name + ": " + this.message;
                    }
                };
            }
            return el.isClosed();
        });

        // Concat every isClosed() return value
        return closedElements.reduce(function(current, former) {
            return current && former;
        });
    };

    renderCircuitLogic = function(elements) {
        var closedElements, logic, i, len, current, next;

        // Map ElectronicElement instances to Array of booleans according to their isClosed
        closedElements = elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw {
                    name: "ElectronicElementError",
                    message: "Must be an instance of ElectronicElement!",
                    toString: function() {
                        return this.name + ": " + this.message;
                    }
                };
            }
            return el.isClosed();
        });

        // Concat every isClosed() return value
        logic = +closedElements[0];
        for (i = 0, len = closedElements.length - 1; i < len; i += 1) {
            current = closedElements[i];
            next = closedElements[i+1];
            logic += ' \u2227 ' + Number(next);
        }
        logic += ' = ' + Number(circuitIsClosed(elements));
        return logic;
    };

    window.JS13KBP = window.JS13KBP || {};

    /* API */
    ns = window.JS13KBP;
    ns.element = {
        ElectronicElement: ElectronicElement,
        SwitchElement: SwitchElement,
        circuitIsClosed: circuitIsClosed,
        renderCircuitLogic: renderCircuitLogic
    };
    return ns;
})(this);
