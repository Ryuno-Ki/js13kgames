(function(global) {
    "use strict";
    var svg, svgProperties, switchElement, seProperties, prop, ns;

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

    switchElement = document.createElement('path');
    // ToDo: Make stroke-width configurable
    seProperties = {
        "stroke": "#000000",
        "stroke-width": 2 + "",
    };
    for (prop in seProperties) {
        switchElement.setAttribute(prop, seProperties[prop]);
    }

    global.JS13KBP = global.JS13KBP || {};

    /* API */
    ns = global.JS13KBP;
    ns.svg = {
        svg: svg,
        switchElement: switchElement
    };
})(this);
