define(function() {
    "use strict";
    /**
     * Deals with manipulating SVG used to display the electronic elements.
     *
     * @module svg
     */
    var svgProperties, prop, el, render, tie;

    /*
     * Create an SVGElement of the DOM and set its properties.
     * An object helps the uglifier keep the file size small.
     */
    el = document.createElement("svg");
    svgProperties = {
        "viewBox": "0 0 100 100",
        "version": "1.1",
        "xmlns": "http://www,w3.org/2000/svg",
        "width": "300",
        "height": "300",
    };
    for (prop in svgProperties) {
        if (svgProperties.hasOwnProperty(prop)) {
            el.setAttribute(prop, svgProperties[prop]);
        }
    }

    /**
     * Calls the render method of element and passes a config object, too.
     * That one is used to tell the element, where on the screen it shall render.
     *
     * @function
     * @name render
     * @param {module:element} element - An electronic element.
     * @param {object} config - Holds the bounding box of the grid.
     */
    render = function(element, config) { return element.render(config); };

    /**
     * Renders a wire connecting two electronic elements.
     *
     * @function
     * @name tie
     * @param {object} config - Holds information useful for rendering.
     * @param {module:element} config.from - Which elements feeds the electricity?
     * @param {module:element} config.to - In which element to feed the electricity?
     */
    tie = function(config) {
        var g, inbound, outbound, origin, exit, controlPoint1, controlPoint2, slope, center, wire;

        config = config || {};
        inbound = [config.from._tile[2], config.from._tile[1] + (config.from._tile[3] - config.from._tile[1]) / 2];
        outbound = [config.to._tile[0], config.to._tile[1] + (config.to._tile[3] - config.to._tile[1]) / 2];
        origin = inbound[0] + ' ' + inbound[1];
        exit = outbound[0] + ' ' + outbound[1];
        controlPoint1 = inbound[0] + ' ' + inbound[1];
        controlPoint2 = outbound[0] + ' ' + outbound[1];

        g = document.createElement('g');

        wire = document.createElement('path');
        wire.setAttribute("d", "M" + origin + "C" + controlPoint1 + " " + controlPoint2 + " " + exit);
        g.appendChild(wire);
        return g;
    };
    return {
        el: el,
        render: render,
        tie: tie,
    };
});
