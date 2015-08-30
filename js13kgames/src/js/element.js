(function(window) {
    "use strict";
    var ns,
        ElectronicElement,
        eeProto,
        SwitchElement,
        seProto,
        PowerSourceElement,
        pseProto,
        ConsumerElement,
        ceProto,
        CircuitElement,
        cieProto;

    // FIXME: Use utils module!
    var inherit,
        extendDeep,
        mix,
        inputSlotMixin,
        outputSlotMixin,
        PowerSourceElementError,
        ConsumerElementError,
        ElectronicElementError;

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

    PowerSourceElementError = {
        name: "PowerSourceElementError",
        message: "Must be an instance of PowerSourceElement!",
        toString: function() {
            return this.name + ": " + this.message;
        }
    };

    ConsumerElementError = {
        name: "ConsumerElementError",
        message: "Must be an instance of ConsumerElement!",
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
            // Using element.setOutput() yields an infinite loop
            element._output = this;
        },
        getInput: function() {
            return this._input;
        },
        hasInput: function() {
            return (typeof this._input !== "undefined") && (this._input !== null);
        }
    };

    outputSlotMixin = {
        setOutput: function(element) {
            if (!(element instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            this._output = element;
            // Using element.setInput() yields an infinite loop
            element._input = this;
        },
        getOutput: function() {
            return this._output;
        },
        hasOutput: function() {
            return (typeof this._output !== "undefined") && (this._output !== null);
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
        that._type = 'electronic';

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

    extendDeep(mix(inputSlotMixin, outputSlotMixin), eeProto);

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

        PowerSourceElement.count += 1;
        that = this;
        that._name = name + '-' + PowerSourceElement.count;
        that._type = 'power-source';
        that._output = null;
    };
    inherit(PowerSourceElement, ElectronicElement);

    PowerSourceElement.count = 0;

    pseProto = PowerSourceElement.prototype;
    extendDeep(outputSlotMixin, pseProto);

    ConsumerElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof ConsumerElement)) {
            return new ConsumerElement(name);
        }

        ConsumerElement.count += 1;

        that = this;
        that._name = name + '-' + ConsumerElement.count;
        that = this;
        that._type = 'consumer';
        that._input = null;
    };
    inherit(ConsumerElement, ElectronicElement);

    ConsumerElement.count = 0;

    ceProto = ConsumerElement.prototype;
    extendDeep(inputSlotMixin, ceProto);

    CircuitElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof CircuitElement)) {
            return new CircuitElement(name);
        }

        that = this;
        that._input = null;
        that._type = 'circuit';
        that._elements = [];
    };
    inherit(CircuitElement, ElectronicElement);

    cieProto = CircuitElement.prototype;
    cieProto.hasPowerSource = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            return el.getType();
        });
        return elementNames.indexOf("power-source") !== -1;
    };

    cieProto.addPowerSource = function(powerSource) {
        if (!(powerSource instanceof PowerSourceElement)) {
            // TODO: Move into errors.js
            throw PowerSourceElementError;
        }
        this._elements.push(powerSource);
    };

    cieProto.hasConsumer = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            return el.getType();
        });
        return elementNames.indexOf("consumer") !== -1;
    };

    cieProto.addConsumer = function(consumer) {
        if (!(consumer instanceof ConsumerElement)) {
            // TODO: Move into errors.js
            throw ConsumerElementError;
        }
        this._elements.push(consumer);
    };

    cieProto.hasElectronic = function() {
        var elementNames, isElectronicElement, i, len;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }
            return el.getType();
        });

        isElectronicElement = function(elementName) {
            var electronics;

            // ToDo: Move this Array out of here!
            electronics = ["electronic", "switch"];
            if (electronics.indexOf(elementName) !== -1) {
                return true;
            }
            return false;
        };

        for (i = 0, len = elementNames.length; i < len; i += 1) {
            if(isElectronicElement(elementNames[i])) {
                return true;
            }
        }
        return false;
    };

    cieProto.addElectronic = function(electronic) {
        if (!(electronic instanceof ElectronicElement)) {
            // TODO: Move into errors.js
            throw ElectronicElementError;
        }
        this._elements.push(electronic);
    };

    cieProto._mapElementsToLogic = function() {
        // Map ElectronicElement instances to Array of booleans according to their isClosed
        return  this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw ElectronicElementError;
            }

            switch (el.getType()) {
                case "power-source":
                    return el.hasOutput() && (el.getOutput() !== null);
                case "consumer":
                    return el.hasInput() && (el.getInput() !== null);
                case "electronic":
                    return el.hasInput() && (el.getInput() !== null) && el.hasOutput() && (el.getOutput() !== null);
                case "switch":
                    return el.hasInput() && (el.getInput() !== null) && el.hasOutput() && (el.getOutput() !== null) && el.isClosed();
                default:
                    return false;
            }
        });
    };

    cieProto.isCompleteCircuit = function() {
        return this.hasPowerSource() && this.hasConsumer() && this.hasElectronic();
    };

    cieProto.isCircuitClosed = function() {
        var closedElements;

        if (!this.isCompleteCircuit()) {
            return false;
        }

        closedElements = this._mapElementsToLogic();

        // Concat every isClosed() return value
        return closedElements.reduce(function(current, former) {
            return current && former;
        });
    };

    cieProto.renderCircuitLogic = function() {
        var closedElements, logic, logicMap, i, len, current, next;

        logicMap = {
            and: '\u2227',
            or: '\u2228',
            not: '\u00AC'
        };

        closedElements = this._mapElementsToLogic();

        // Concat every isClosed() return value
        if (closedElements.length) {
            logic = +closedElements[0];
        } else {
            logic = 0;
        }
        for (i = 0, len = closedElements.length - 1; i < len; i += 1) {
            current = closedElements[i];
            next = closedElements[i+1];
            logic += ' ' + logicMap.and + ' ' + Number(next);
        }
        logic += ' = ' + Number(this.isCircuitClosed());
        return logic;
    };

    window.JS13KBP = window.JS13KBP || {};

    /* API */
    ns = window.JS13KBP;
    ns.element = {
        ElectronicElement: ElectronicElement,
        SwitchElement: SwitchElement,
        PowerSourceElement: PowerSourceElement,
        ConsumerElement: ConsumerElement,
        CircuitElement: CircuitElement,
    };
    return ns;
})(this);
