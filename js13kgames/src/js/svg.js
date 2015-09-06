(function(global) {
    "use strict";
    var svg, svgProperties, switchElement, prop, ns;

    svg = document.createElement('svg');
    svgProperties = {
        "viewBox": "0 0 100 100",
        "version": "1.1",
        "xmlns": "http://www,w3.org/2000/svg",
        "width": "100",
        "height": "100",
    };
    for (prop in svgProperties) {
        svg.setAttribute(prop, svgProperties[prop]);
    }

    switchElement = (function() {
        var g, inbound, outbound, pier1, pier2, bridge, strokeWidth, boundLength, bridgeLength;

        g = document.createElement('g');
        strokeWidth = 5;
        boundLength = 10;
        bridgeLength = 30;

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", strokeWidth + "");
        inbound.setAttribute("d", "m 0 50 h " + boundLength);
        g.appendChild(inbound);

        pier1 = document.createElement('circle');
        pier1.setAttribute("r", strokeWidth + "");
        pier1.setAttribute("cx", (boundLength + strokeWidth) + "");
        pier1.setAttribute("cy", "50");
        g.appendChild(pier1);

        bridge = document.createElement('path');
        bridge.setAttribute("stroke", "#000000");
        bridge.setAttribute("stroke-width", strokeWidth + "");
        bridge.setAttribute("d", "m " + (boundLength + 2 * strokeWidth) + " 50 l " + bridgeLength + " -" + strokeWidth);
        g.appendChild(bridge);

        pier2 = document.createElement('circle');
        pier2.setAttribute("r", strokeWidth + "");
        pier2.setAttribute("cx", (boundLength + 2 * strokeWidth + bridgeLength) + "");
        pier2.setAttribute("cy", "50");
        g.appendChild(pier2);

        outbound = document.createElement("path");
        outbound.setAttribute("stroke", "#000000");
        outbound.setAttribute("stroke-width", strokeWidth + "");
        outbound.setAttribute("d", "m " + (boundLength + 2 * strokeWidth + bridgeLength + strokeWidth) + " 50 h " + boundLength);
        g.appendChild(outbound);
        return g;
    })();

    global.JS13KBP = global.JS13KBP || {};

    /* API */
    ns = global.JS13KBP;
    ns.svg = {
        svg: svg,
        switchElement: switchElement
    };
})(this);
