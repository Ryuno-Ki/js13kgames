define(["app/element", "app/utils", "app/errors"], function(electronicElement, utils, errors) {
    "use strict";
    var CircuitElement,
        ceProto;

    CircuitElement = function(name) {
        var that;

        // Ensure being called with `new`
        if (!(this instanceof CircuitElement)) {
            return new CircuitElement(name);
        }

        that = this;
        that.name = "CircuitElement";
        that._input = null;
        that._type = 'circuit';
        that._elements = [];
    };
    ceProto = CircuitElement.prototype;
    utils.inherit(CircuitElement, electronicElement.ElectronicElement);
    ceProto.hasPowerSource = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            return el.getType();
        });
        return elementNames.indexOf("power-source") !== -1;
    };

    ceProto.addPowerSource = function(powerSource) {
        this._elements.push(powerSource);
    };

    ceProto.hasConsumer = function() {
        var elementNames;

        elementNames = this._elements.map(function(el) {
            return el.getType();
        });
        return elementNames.indexOf("consumer") !== -1;
    };

    ceProto.addConsumer = function(consumer) {
        this._elements.push(consumer);
    };

    ceProto.hasElectronic = function() {
        var elementNames, isElectronicElement, i, len;

        elementNames = this._elements.map(function(el) {
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

    ceProto.addElectronic = function(electronic) {
        this._elements.push(electronic);
    };

    ceProto._mapElementsToLogic = function() {
        // Map ElectronicElement instances to Array of booleans according to their isClosed
        return  this._elements.map(function(el) {
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

    ceProto.isCompleteCircuit = function() {
        return this.hasPowerSource() && this.hasConsumer() && this.hasElectronic();
    };

    ceProto.isCircuitClosed = function() {
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

    ceProto.renderCircuitLogic = function() {
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

    return {
        CircuitElement: CircuitElement,
    }
});
