(function(global) {
    "use strict";
    var svg, svgProperties, powerSource, switchElement, consumer, prop, ns;

    svg = document.createElement('svg');
    svgProperties = {
        "viewBox": "0 0 100 100",
        "version": "1.1",
        "xmlns": "http://www,w3.org/2000/svg",
        "width": "300",
        "height": "300",
    };
    for (prop in svgProperties) {
        svg.setAttribute(prop, svgProperties[prop]);
    }

    powerSource = (function(config) {
        var g, pse, leftBorderCenter;

        config = config || {};
        config.id = config.id || "power-source";
        config.strokeWidth = config.strokeWidth || 5;
        config.boundingBox = config.boundingBox || [0, 0, 25, 100];
        leftBorderCenter = (config.boundingBox[3] - config.boundingBox[1])/2;

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        pse = document.createElement('path');
        pse.setAttribute("stroke", "#000000");
        pse.setAttribute("stroke-width", config.strokeWidth + "");
        pse.setAttribute('d', 'm ' + (config.boundingBox[0]+5) + ' ' + (leftBorderCenter-10) + ' v 20 m 10 -30 v 40');
        g.appendChild(pse);
        return g;
    })();

    switchElement = (function(config) {
        var g, inbound, outbound, pier1, pier2, bridge, leftBorderCenter;

        config = config || {};
        config.id = config.id || "switch";
        config.strokeWidth = config.strokeWidth || 5;
        config.boundLength = config.boundLength || 10;
        config.bridgeLength = config.bridgeLength || 30;
        config.boundingBox = config.boundingBox || [15, 0, 50, 100];
        leftBorderCenter = (config.boundingBox[3] - config.boundingBox[1])/2;

        g = document.createElement('g');
        g.setAttribute("id", "switch");

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", config.strokeWidth + "");
        inbound.setAttribute("d", "m " + config.boundingBox[0] + " " + leftBorderCenter + " h " + config.boundLength);
        g.appendChild(inbound);

        pier1 = document.createElement('circle');
        pier1.setAttribute("r", config.strokeWidth + "");
        pier1.setAttribute("cx", (config.boundingBox[0] + config.boundLength + config.strokeWidth) + "");
        pier1.setAttribute("cy", leftBorderCenter + "");
        g.appendChild(pier1);

        bridge = document.createElement('path');
        bridge.setAttribute("stroke", "#000000");
        bridge.setAttribute("stroke-width", config.strokeWidth + "");
        bridge.setAttribute("d", "m " + (config.boundingBox[0] + config.boundLength + 2 * config.strokeWidth) + " 50 l " + config.bridgeLength + " -" + config.strokeWidth);
        g.appendChild(bridge);

        pier2 = document.createElement('circle');
        pier2.setAttribute("r", config.strokeWidth + "");
        pier2.setAttribute("cx", (config.boundingBox[0] + config.boundLength + 2 * config.strokeWidth + config.bridgeLength) + "");
        pier2.setAttribute("cy", "50");
        g.appendChild(pier2);

        outbound = document.createElement("path");
        outbound.setAttribute("stroke", "#000000");
        outbound.setAttribute("stroke-width", config.strokeWidth + "");
        outbound.setAttribute("d", "m " + (config.boundingBox[0] + config.boundLength + 2 * config.strokeWidth + config.bridgeLength + config.strokeWidth) + " 50 h " + config.boundLength);
        g.appendChild(outbound);
        return g;
    })();

    consumer = (function(config) {
        var g, inbound, lamp, lampCross, leftBorderCenter;

        config = config || {};
        config.id = config.id || "consumer";
        config.strokeWidth = config.strokeWidth || 5;
        config.boundLength = config.boundLength || 10;
        config.boundingBox = config.boundingBox || [75, 0, 100, 100];
        leftBorderCenter = (config.boundingBox[3] - config.boundingBox[1])/2;

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", config.strokeWidth + "");
        inbound.setAttribute('d', 'm ' + config.boundingBox[0] + ' ' + leftBorderCenter + ' h ' + config.boundLength);
        g.appendChild(inbound);

        lamp = document.createElement('circle');
        lamp.setAttribute('r', 2 * config.strokeWidth + '');
        lamp.setAttribute('cx', (config.boundingBox[0] + config.boundLength + config.strokeWidth) + '');
        lamp.setAttribute('cy', leftBorderCenter + '');
        g.appendChild(lamp);

        lampCross = document.createElement('path');
        lampCross.setAttribute("stroke", "#000000");
        lampCross.setAttribute("stroke-width", config.strokeWidth + "");
        lampCross.setAttribute("d", "m " + (config.boundingBox[0] + (config.boundLength / 2)) + " 50 l " + (4 * config.strokeWidth) + " 0");
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
