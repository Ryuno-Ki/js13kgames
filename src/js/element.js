define(["js/utils", "js/errors"], function(utils, errors) {
    "use strict";
    var inputSlotMixin,
        outputSlotMixin,
        ConsumerElement,
        ceProto,
        CircuitElement,
        cieProto,
        ElectronicElement,
        eeProto,
        PowerSourceElement,
        pseProto,
        SwitchElement,
        seProto;

    inputSlotMixin = {
        setInput: function(element) {
            if (!(element instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw errors.ElectronicElementError;
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
                throw errors.ElectronicElementError;
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
    cieProto = CircuitElement.prototype;
    utils.inherit(CircuitElement, ElectronicElement);
    cieProto.hasPowerSource = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw errors.ElectronicElementError;
            }
            return el.getType();
        });
        return elementNames.indexOf("power-source") !== -1;
    };

    cieProto.addPowerSource = function(powerSource) {
        if (!(powerSource instanceof PowerSourceElement)) {
            // TODO: Move into errors.js
            throw errors.PowerSourceElementError;
        }
        this._elements.push(powerSource);
    };

    cieProto.hasConsumer = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw errors.ElectronicElementError;
            }
            return el.getType();
        });
        return elementNames.indexOf("consumer") !== -1;
    };

    cieProto.addConsumer = function(consumer) {
        if (!(consumer instanceof ConsumerElement)) {
            // TODO: Move into errors.js
            throw errors.ConsumerElementError;
        }
        this._elements.push(consumer);
    };

    cieProto.hasElectronic = function() {
        var elementNames, isElectronicElement, i, len;

        elementNames = this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw errors.ElectronicElementError;
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
            throw errors.ElectronicElementError;
        }
        this._elements.push(electronic);
    };

    cieProto._mapElementsToLogic = function() {
        // Map ElectronicElement instances to Array of booleans according to their isClosed
        return  this._elements.map(function(el) {
            if (!(el instanceof ElectronicElement)) {
                // TODO: Move into errors.js
                throw errors.ElectronicElementError;
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
    ceProto = ConsumerElement.prototype;
    utils.inherit(ConsumerElement, ElectronicElement);
    utils.extendDeep(inputSlotMixin, ceProto);
    ConsumerElement.count = 0;

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
    utils.extendDeep(utils.mix(inputSlotMixin, outputSlotMixin), eeProto);

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
    pseProto = PowerSourceElement.prototype;
    utils.inherit(PowerSourceElement, ElectronicElement);
    utils.extendDeep(outputSlotMixin, pseProto);
    PowerSourceElement.count = 0;

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
    seProto = SwitchElement.prototype;
    utils.inherit(SwitchElement, ElectronicElement);
    utils.extendDeep(utils.mix(inputSlotMixin, outputSlotMixin), seProto);
    // Static methods
    SwitchElement.count = 0;
    seProto.isClosed = function() {
        return this._closed;
    };
    seProto.useSwitch = function() {
        this._closed = !this._closed;
    };

    return {
        CircuitElement: CircuitElement,
        ConsumerElement: ConsumerElement,
        PowerSourceElement: PowerSourceElement,
        SwitchElement: SwitchElement,
    };
});
/*
    eeProto.renderSelf = function(node) {
        var img, that;

        that = this;
        img = "<img src='build/" + that._icon + "' alt='" + that._type + ": " + that._name + "' />";
        node.innerHTML += img;
    };

    seProto.renderSelf = function(node) {
        var img, that, closed;

        that = this;
        closed = that._closed ? 'closed' : 'open';

        img = "<img src='build/" + that._icon + "-" + closed + ".svg' ";
        img += "alt='" + that._type + "-" + closed + ": " + that._name + "' />";
        node.innerHTML += img;
    };
*/
