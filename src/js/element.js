define(["app/utils", "app/errors"], function(utils, errors) {
    "use strict";
    var ElectronicElement,
        eeProto;

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
    eeProto.setInput = function(element) {
        if (!(element instanceof ElectronicElement)) {
            console.log("element:", element, element.constructor);
            console.log("proto:", element.prototype);
            throw errors.ElectronicElementError;
        }

        this._input = element;
        // Using element.setOutput() yields an infinite loop
        element._output = this;
    };
    eeProto.getInput = function() {
        return this._input;
    };
    eeProto.hasInput = function() {
        return (typeof this._input !== "undefined") && (this._input !== null);
    };

    return {
        ElectronicElement: ElectronicElement,
    };
});
