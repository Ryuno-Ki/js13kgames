define(function() {
    "use strict";
    var svgProperties, prop;
    var el, render, tie;

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
    render = function(element, config) { return element.render(config); };
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
