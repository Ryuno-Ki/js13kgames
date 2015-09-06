(function(global) {
    "use strict";
    var game, app, element, ps, switchElement, se, e, circuit, c, logic, svg, switchEl;

    game = document.getElementById("game");

    // Shorthands
    app = global.JS13KBP;
    element = app.element;
    svg = app.svg;

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

    game.appendChild(svg.svg);
    svg.svg.appendChild(svg.switchElement);
    svg.svg.outerHTML = svg.svg.outerHTML;  // Enforce repaint
})(this);
