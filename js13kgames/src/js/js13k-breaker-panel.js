(function(global) {
    "use strict";
    var game, app, element, ps, switchElement, se, e, circuit, c, logic, svg, rect, circle;

    game = document.getElementById("game");

    // Shorthands
    app = global.JS13KBP;
    element = app.element;

    ps = new element.PowerSourceElement("power-source");
    switchElement = new element.SwitchElement("switchElement");
    se = new element.SwitchElement("se");
    e = new element.SwitchElement("e");
    circuit = new element.CircuitElement("circuit");
    c = new element.ConsumerElement("consumer");

    switchElement.setInput(se);
    se.setInput(e);

    circuit.addPowerSource(ps);
    circuit.addElectronic(switchElement);
    circuit.addElectronic(se);
    circuit.addElectronic(e);
    circuit.addConsumer(c);

    logic = document.createElement('div');
    logic.innerHTML += circuit.renderCircuitLogic();
    // game.appendChild(logic);

    svg = document.createElement('svg');
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www,w3.org/2000/svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    game.appendChild(svg);

    rect = document.createElement('rect');
    rect.setAttribute("x", "10");
    rect.setAttribute("y", "20");
    rect.setAttribute("width", "30");
    rect.setAttribute("height", "40");

    circle = document.createElement("circle");
    circle.setAttribute("cx", "60");  // Coordinate x
    circle.setAttribute("cy", "60");  // Coordinate y
    circle.setAttribute("r", "40");   // Radius

    svg.appendChild(rect);
    svg.appendChild(circle);
    svg.outerHTML = svg.outerHTML;  // Enforce repaint
})(this);
