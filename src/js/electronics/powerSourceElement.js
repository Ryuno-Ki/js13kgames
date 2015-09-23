define(["element", "utils"], function(electronicElement, utils) {
    "use strict";
    /**
     * Represents a power source in the circuit. Electricity is implicitly directed back to it.
     *
     * @module
     * @requires element
     * @requires utils
     */
    var PowerSourceElement;

    /**
     * Constructs a power source.
     *
     * @constructor PowerSourceElement
     * @extends module.element~ElectronicElement
     */
    PowerSourceElement = function() {
        var that;
        PowerSourceElement.count += 1;
        that = this;
        that._type = 'power-source';
        that._output = null;
        that._tile = null;
    };
    utils.inherit(PowerSourceElement, electronicElement.ElectronicElement);

    /**
     * Holds a reference about how many instances were created. I originally used this to create unique names.
     *
     * @static
     * @name count
     */
    PowerSourceElement.count = 0;

    /**
     * Renders a G node to append to SVG.
     *
     * @function
     * @name render
     * @this module:electronics/powerSourceElement~PowerSourceElement.prototype
     * @memberof module:electronics/powerSourceElement~PowerSourceElement.prototype
     * @param {object} config - Holds the bounding box wherein to render.
     * @returns {HTMLUnknownElement} g - The group node holding the SVG elements of this object.
     */
    PowerSourceElement.prototype.render= function(config) {
        var g, pse, height, width, leftBorderCenter, strokeHeight, origin, longBar, shortBars, exit;

        config = config || {};
        this._tile = config.bb.slice();
        height = this._tile[3] - this._tile[1];
        width = this._tile[2] - this._tile[0];
        leftBorderCenter = this._tile[1] + height / 2;
        strokeHeight = 0.9 * height;
        origin = (this._tile[0] + 0.25 * width) + ' ' + 0.05 * height;
        longBar = 'v' + strokeHeight;
        shortBars = 'v' + (0.4 * height) + 'm0 ' + (0.1 * height) + 'v' + (0.4 * height);

        g = document.createElement('g');

        pse = document.createElement('path');
        pse.setAttribute('d', 'm' + origin + longBar + 'm' + (0.25 * width) + ' ' + (-strokeHeight) + shortBars);
        g.appendChild(pse);

        exit = document.createElement('path');
        exit.setAttribute("d", "M0 0m" + (this._tile[0] + 0.5 * width) + ' ' + (0.5 * height) + "h" + (0.5 * width));
        g.appendChild(exit);
        return g;
    };
    return {
        PowerSourceElement: PowerSourceElement,
    };
});
