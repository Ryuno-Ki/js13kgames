(function(global) {
    "use strict";
    var svg, svgProperties, prop, ns;
    var renderPowerSource, renderSwitchElement, renderCable, renderConsumer;

    svg = document.createElement('svg');
    svgProperties = {
        "viewBox": "0 0 100 100",
        "version": "1.1",
        "xmlns": "http://www,w3.org/2000/svg",
        "width": "300",
        "height": "300",
    };
    for (prop in svgProperties) {
        if (svgProperties.hasOwnProperty(prop)) {
            svg.setAttribute(prop, svgProperties[prop]);
        }
    }

    renderPowerSource = function(config) {
        var g, pse, height, width, leftBorderCenter, strokeHeight, origin, longBar, shortBars, exit;

        config = config || {};
        config.id = config.id || "power-source";
        config.strokeWidth = config.strokeWidth || 1;
        config.bb = config.bb || [0, 0, 25, 100];  // boundingBox

        height = config.bb[3] - config.bb[1];
        width = config.bb[2] - config.bb[0];
        leftBorderCenter = config.bb[1] + height / 2;
        strokeHeight = 0.9 * height;
        origin = (config.bb[0] + 0.25 * width) + ' ' + 0.05 * height;
        longBar = 'v' + strokeHeight;
        shortBars = 'v' + (0.4 * height) + 'm0 ' + (0.1 * height) + 'v' + (0.4 * height);

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        pse = document.createElement('path');
        pse.setAttribute("stroke", "#000000");
        pse.setAttribute("stroke-width", config.strokeWidth + "");
        pse.setAttribute('d', 'm' + origin + longBar + 'm' + (0.25 * width) + ' ' + (-strokeHeight) + shortBars);
        g.appendChild(pse);

        exit = document.createElement('path');
        exit.setAttribute("stroke", "#000000");
        exit.setAttribute("stroke-width", config.strokeWidth + "");
        exit.setAttribute("class", "live");
        exit.setAttribute("d", "m" + (0.5 * width) + " " + leftBorderCenter + "h" + (0.5*width));
        g.appendChild(exit);
        return g;
    };

    renderCable = function(config) {
        var g, origin, exit, controlPoint1, controlPoint2, slope, center, wire;

        config = config || {};
        config.id = config.id || "cable";
        config.strokeWidth = config.strokeWidth || 1;
        config.inbound = config.inbound || [15, 0];
        config.outbound = config.outbound || [50, 100];

        origin = config.inbound[0] + ' ' + config.inbound[1];
        exit = config.outbound[0] + ' ' + config.outbound[1];
        controlPoint1 = (config.inbound[0] + 5) + ' ' + config.inbound[1];
        controlPoint2 = (config.outbound[0] - 5) + ' ' + config.outbound[1];

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        wire = document.createElement('path');
        wire.setAttribute("stroke", "#000000");
        wire.setAttribute("stroke-width", config.strokeWidth + "");
        wire.setAttribute("class", "live");
        wire.setAttribute("d", "M" + origin + "C" + controlPoint1 + " " + controlPoint2 + " " + exit);
        g.appendChild(wire);
        return g;
    };

    renderSwitchElement = function(config) {
        var g, height, width, leftBorderCenter, origin;
        var inbound, inboundLength, outbound, outboundLength;
        var pierRadius, pier1Origin, pier1, pier2Origin, pier2;
        var bridge, bridgeOrigin, bridgeLength;

        config = config || {};
        config.id = config.id || "switch";
        config.strokeWidth = config.strokeWidth || 1;
        config.bb = config.bb || [15, 0, 50, 100]; // boundingBox

        height = config.bb[3] - config.bb[1];
        width = config.bb[2] - config.bb[0];
        leftBorderCenter = config.bb[1] + height / 2;
        origin = config.bb[0] + ' ' + (0.5 * height);

        // Width is composed by inboundLength + 2 * pierRadius + bridgeLength + 2 * pierRadius + outboundLength
        inboundLength = 0.05 * width;
        outboundLength = 0.05 * width;

        pierRadius = 0.05 * width;
        pier1Origin = config.bb[0] + inboundLength + 2 * pierRadius; 
        bridgeOrigin = pier1Origin + ' ' + leftBorderCenter;
        bridgeLength = 0.6 * width;
        pier2Origin = pier1Origin + bridgeLength + pierRadius;

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", config.strokeWidth + "");
        inbound.setAttribute("class", "live");
        inbound.setAttribute("d", "m" + origin + "h" + inboundLength);
        g.appendChild(inbound);

        pier1 = document.createElement('circle');
        pier1.setAttribute("r", pierRadius + "");
        // On same offset as origin, moved along inbound path and bridged its own radius
        pier1.setAttribute("cx", config.bb[0] + inboundLength + pierRadius + "");
        pier1.setAttribute("cy", leftBorderCenter + "");
        g.appendChild(pier1);

        bridge = document.createElement('path');
        bridge.setAttribute("stroke", "#000000");
        bridge.setAttribute("stroke-width", config.strokeWidth + "");
        bridge.setAttribute("class", "live");
        bridge.setAttribute("d", "m" + bridgeOrigin + "l" + bridgeLength + " " + (-pierRadius));
        g.appendChild(bridge);

        pier2 = document.createElement('circle');
        pier2.setAttribute("r", pierRadius + "");
        // On same offset as origin, moved along inbound and bridge path and bridged both pier radii
        pier2.setAttribute("cx", config.bb[0] + inboundLength + 2 * pierRadius + bridgeLength + "");
        pier2.setAttribute("cy", leftBorderCenter + "");
        g.appendChild(pier2);

        outbound = document.createElement("path");
        outbound.setAttribute("stroke", "#000000");
        outbound.setAttribute("stroke-width", config.strokeWidth + "");
        outbound.setAttribute("class", "live");
        outbound.setAttribute("d", "m" + pier2Origin  + " " + leftBorderCenter + "h" + outboundLength);
        g.appendChild(outbound);
        return g;
    };

    renderConsumer = function(config) {
        var g, height, width, leftBorderCenter, origin, inbound, inboundLength, lamp, lampRadius, lampCross;

        config = config || {};
        config.id = config.id || "consumer";
        config.strokeWidth = config.strokeWidth || 1;
        config.bb = config.bb || [75, 0, 100, 100];

        height = config.bb[3] - config.bb[1];
        width = config.bb[2] - config.bb[0];
        leftBorderCenter = config.bb[1] + height / 2;
        origin = config.bb[0] + ' ' + (0.5 * height);

        inboundLength = 0.2 * width;
        lampRadius = 0.3 * width;

        g = document.createElement('g');
        g.setAttribute("id", config.id);

        inbound = document.createElement('path');
        inbound.setAttribute("stroke", "#000000");
        inbound.setAttribute("stroke-width", config.strokeWidth + "");
        inbound.setAttribute("class", "live");
        inbound.setAttribute('d', 'm ' + config.bb[0] + ' ' + leftBorderCenter + ' h ' + inboundLength);
        g.appendChild(inbound);

        lamp = document.createElement('circle');
        lamp.setAttribute('r', lampRadius + '');
        lamp.setAttribute('cx', (config.bb[0] + inboundLength + lampRadius) + '');
        lamp.setAttribute('cy', leftBorderCenter + '');
        g.appendChild(lamp);

        lampCross = document.createElement('path');
        lampCross.setAttribute("stroke", "#000000");
        lampCross.setAttribute("stroke-width", config.strokeWidth + "");
        lampCross.setAttribute("d", "m" + (config.bb[0] + (lampRadius / 2)) + " " + leftBorderCenter + "l" + (2 * lampRadius) + " 0");
        g.appendChild(lampCross);
        return g;
    };

    global.JS13KBP = global.JS13KBP || {};

    /* API */
    ns = global.JS13KBP;
    ns.svg = {
        svg: svg,
        renderPowerSource: renderPowerSource,
        renderSwitchElement: renderSwitchElement,
        renderCable: renderCable,
        renderConsumer: renderConsumer
    };
})(this);
