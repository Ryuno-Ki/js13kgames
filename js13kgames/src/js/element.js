(function(window) {
    "use strict";
    var ns,
        ElectronicElement,
        eeProto,
        SwitchElement,
        seProto,
        PowerSourceElement,
        pseProto,
        circuitIsClosed,
        renderCircuitLogic;

    // FIXME: Use utils module!
    var inherit, extendDeep, mix, inputSlotMixin, outputSlotMixin, ElectronicElementError;

    // FIXME: Use utils.inherit, utils.extendDeep, utils.mix and errors.ElectronicElementError!
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

    ElectronicElementError = {
        name: "ElectronicElementError",
        message: "Must be an instance of ElectronicElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

    inputSlotMixin = {
        setInput: function(element) {
            if (!(element instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            this._input = element;
        },
        getInput: function() {
            return this._input;
        },
        hasInput: function() {
            return this._input !== null;
        }
    };

    outputSlotMixin = {
        setOutput: function(element) {
            if (!(element instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            this._output = element;
        },
        getOutput: function() {
            return this._output;
        },
        hasOutput: function() {
            return this._output !== null;
        }

    };

    /**
     * Describes abstract parent class for all construction elements.
     */
    ElectronicElement = function ElectronicElement(name) {
        // Ensure being called with `new`
        if (!(this instanceof ElectronicElement)) {
            return new ElectronicElement(name);
        }

        // Private members
        var feature, called, that;

        that = this;
        ElectronicElement.count += 1;
        that._name = name + '-' + ElectronicElement.count;
        that._type = 'element';

        // feature is truly private here
        // Doesn't work with Arrays and Objects (passed by reference!)
        feature = 'sizzles';
        that.getFeature = function() {
            return feature;
        };
    };

    // Static methods
    ElectronicElement.count = 0;

    // Instance methods
    eeProto = ElectronicElement.prototype;
    eeProto.getName = function() {
        return this._name;
    };

    eeProto.getType = function() {
        return this._type;
    };

    eeProto.hasInput = function() {
        return false;
    };

    eeProto.hasOutput = function() {
        return false;
    };

    eeProto.renderSelf = function(node) {
        var img, that;

        that = this;
        img = "<img src='build/" + that._icon + "' alt='" + that._type + ": " + that._name + "' />";
        node.innerHTML += img;
    };

    SwitchElement = function(name) {
        // Ensure being called with `new`
        if (!(this instanceof SwitchElement)) {
            return new SwitchElement(name);
        }

        // Private members
        var feature, called, that;

        SwitchElement.count += 1;
        that = this;
        that._name = name + '-' + SwitchElement.count;
        that._type = 'switch';
        that._closed = true;
        that._icon = 'switch';

        that._input = null;
        that._output = null;
    };

    inherit(SwitchElement, ElectronicElement);
    // Static methods
    SwitchElement.count = 0;

    seProto = SwitchElement.prototype;
    seProto.isClosed = function() {
        return this._closed;
    };

    seProto.renderSelf = function(node) {
        var img, that, closed;

        that = this;
        closed = that._closed ? 'closed' : 'open';

        img = "<img src='build/" + that._icon + "-" + closed + ".svg' ";
        img += "alt='" + that._type + "-" + closed + ": " + that._name + "' />";
        node.innerHTML += img;
    };

    extendDeep(mix(inputSlotMixin, outputSlotMixin), seProto);

    seProto.useSwitch = function() {
        this._closed = !this._closed;
    };

    PowerSourceElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof PowerSourceElement)) {
            return new PowerSourceElement(name);
        }

        that = this;
        that._output = null;
    };
    inherit(PowerSourceElement, ElectronicElement);

    pseProto = PowerSourceElement.prototype;
    extendDeep(outputSlotMixin, pseProto);

    circuitIsClosed = function(elements) {
        var closedElements;

        // Map ElectronicElement instances to Array of booleans according to their isClosed
        closedElements = elements.map(function(el) {
            var isClosed, hasInput, hasOutput;
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            isClosed = el.isClosed();
            hasInput = el.getInput() !== null;
            hasOutput = el.getOutput() !== null;
            return isClosed && hasInput && hasOutput;
        });

        // Concat every isClosed() return value
        return closedElements.reduce(function(current, former) {
            return current && former;
        });
    };

    renderCircuitLogic = function(elements) {
        var closedElements, logic, logicMap, i, len, current, next;

        logicMap = {
            and: '\u2227',
            or: '\u2228',
            not: '\u00AC'
        };

        // Map ElectronicElement instances to Array of booleans according to their isClosed
        closedElements = elements.map(function(el) {
            var isClosed, hasInput, hasOutput;
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            isClosed = el.isClosed();
            hasInput = el.getInput() !== null;
            hasOutput = el.getOutput() !== null;
            return isClosed && hasInput && hasOutput;
        });

        // Concat every isClosed() return value
        logic = +closedElements[0];
        for (i = 0, len = closedElements.length - 1; i < len; i += 1) {
            current = closedElements[i];
            next = closedElements[i+1];
            logic += ' ' + logicMap.and + ' ' + Number(next);
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
        PowerSourceElement: PowerSourceElement,
        circuitIsClosed: circuitIsClosed,
        renderCircuitLogic: renderCircuitLogic
    };
    return ns;
})(this);
