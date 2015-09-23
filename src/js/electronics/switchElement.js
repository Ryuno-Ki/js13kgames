define(["element", "utils"], function(electronicElement, utils) {
    "use strict";
    /**
     * Represents a switch in the circuit.
     *
     * @module
     * @requires element
     * @requires utils
     */
    var SwitchElement,
        seProto;

    /**
     * Constructs a switch
     *
     * @constructor SwitchElement
     * @extends module.element~ElectronicElement
     */
    SwitchElement = function() {
        // Private members
        var that;
        SwitchElement.count += 1;
        that = this;
        that._type = 'switch';
        that._closed = false;
        that._input = null;
        that._output = null;
        that._tile = null;
    };
    utils.inherit(SwitchElement, electronicElement.ElectronicElement);
    /**
     * Holds a reference about how many instances were created. I originally used this to create unique names.
     *
     * @static
     * @name count
     */
    SwitchElement.count = 0;

    seProto = SwitchElement.prototype;
    /**
     * Reports about whether the switch is closed or open.
     *
     * @function
     * @name isClosed
     * @this module:electronics/switchElement~SwitchElement.prototype
     * @memberof module:electronics/switchElement~SwitchElement.prototype
     * @returns {boolean} result - If switch is closed 'true', otherwise 'false'.
     */
    seProto.isClosed = function() { return this._closed; };

    /**
     * Toggle the switch.
     *
     * @function
     * @name useSwitch
     * @memberof module:electronics/switchElement~SwitchElement.prototype
     * @this module:electronics/switchElement~SwitchElement.prototype
     */
    seProto.useSwitch = function() { this._closed = !this._closed; };

    /**
     * Renders a G node to append to SVG.
     *
     * @function
     * @name render
     * @this module:electronics/switchElement~SwitchElement.prototype
     * @memberof module:electronics/switchElement~SwitchElement.prototype
     * @param {object} config - Holds the bounding box wherein to render.
     * @returns {HTMLUnknownElement} g - The group node holding the SVG elements of this object.
     */
    seProto.render = function(config) {
        var g, doc, height, width, leftBorderCenter, origin, prop, props;
        var inbound, inboundLength, outbound, outboundLength;
        var pierRadius, pier1Origin, pier1, pier2Origin, pier2;
        var bridge, bridgeOrigin, bridgeLength;

        doc = document;
        config = config || {};
        this._tile = config.bb.slice();
        height = this._tile[3] - this._tile[1];
        width = this._tile[2] - this._tile[0];
        leftBorderCenter = this._tile[1] + height / 2;
        origin = this._tile[0] + ' ' + (0.5 * height);

        // Width is composed by inboundLength + 2 * pierRadius + bridgeLength + 2 * pierRadius + outboundLength
        inboundLength = 0.05 * width;
        outboundLength = 0.05 * width;

        pierRadius = 0.05 * width;
        pier1Origin = config.bb[0] + inboundLength + 2 * pierRadius; 
        bridgeOrigin = pier1Origin + ' ' + leftBorderCenter;
        bridgeLength = 0.6 * width;
        pier2Origin = pier1Origin + bridgeLength + pierRadius;

        g = doc.createElement('g');
        g.setAttribute("class", "switch");

        /*
        inbound = doc.createElement('path');
        inbound.setAttribute("class", "live");
        inbound.setAttribute("d", "M0 0m" + origin + "h" + inboundLength);
        g.appendChild(inbound);
        */

        pier1 = doc.createElement('circle');
        props = {
            "r": pierRadius + "",
            "cx": config.bb[0] + inboundLength + pierRadius + "",
            "cy": leftBorderCenter + ""
        };
        for (prop in props) {
            pier1.setAttribute(prop, props[prop]);
        }
        g.appendChild(pier1);

        bridge = doc.createElement('path');
        bridge.setAttribute("d", "m" + bridgeOrigin + "l" + bridgeLength + " " + (-pierRadius));
        g.appendChild(bridge);

        pier2 = doc.createElement('circle');
        props.cx = config.bb[0] + inboundLength + 4 * pierRadius + bridgeLength + "";
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                pier2.setAttribute(prop, props[prop]);
            }
        }
        g.appendChild(pier2);

        outbound = doc.createElement("path");
        outbound.setAttribute("d", "m" + pier2Origin  + " " + leftBorderCenter + "h" + outboundLength);
        g.appendChild(outbound);
        return g;
    };
    return {
        SwitchElement: SwitchElement
    };
});
