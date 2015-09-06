(function(global) {
    "use strict";
    var svg, svgProperties, powerSource, switchElement, consumer, prop, ns;

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

    powerSource = (function() {
        var g, strokeWidth, pse;

        g = document.createElement('g');
        g.setAttribute("id", "power-source");

        strokeWidth = 5;

        pse = document.createElement('path');
        pse.setAttribute("stroke", "#000000");
        pse.setAttribute("stroke-width", strokeWidth + "");
        pse.setAttribute('d', 'm 5 40 v 20 m 10 -30 v 40');
        g.appendChild(pse);
        return g;
    })();

    switchElement = (function() {
        // TODO: Pass a config object in order to assign an id to bridge
        // Make positions configurable, too. That is, don't assume 100x100, placed at 0,0
        var g, inbound, outbound, pier1, pier2, bridge, strokeWidth, boundLength, bridgeLength;

        g = document.createElement('g');
        g.setAttribute("id", "switch");

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

    consumer = (function() {
        var g, strokeWidth, boundLength, inbound, lamp, lampCross;

        g = document.createElement('g');
        g.setAttribute("id", "consumer");

        strokeWidth = 5;
        boundLength = 10;

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", strokeWidth + "");
        inbound.setAttribute("d", "m 0 50 h " + boundLength);
        g.appendChild(inbound);

        lamp = document.createElement('circle');
        lamp.setAttribute('r', 2 * strokeWidth + '');
        lamp.setAttribute('cx', (boundLength + strokeWidth) + '');
        lamp.setAttribute('cy', '50');
        g.appendChild(lamp);

        lampCross = document.createElement('path');
        lampCross.setAttribute("stroke", "#000000");
        lampCross.setAttribute("stroke-width", strokeWidth + "");
        lampCross.setAttribute("d", "m " + (boundLength / 2) + " 50 l " + (4 * strokeWidth) + " 0");
        g.appendChild(lampCross);
        return g;
    })();

    global.JS13KBP = global.JS13KBP || {};

    /* API */
    ns = global.JS13KBP;
    ns.svg = {
        svg: svg,
        powerSource: powerSource,
        switchElement: switchElement,
        consumer: consumer
    };
})(this);
