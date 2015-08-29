(function(global) {
    "use strict";
    var game, app, element, switchElement, se, e, logic;

    game = document.getElementById("game");

    // Shorthands
    app = global.JS13KBP;
    element = app.element;

    switchElement = new element.SwitchElement("switchElement");
    se = new element.SwitchElement("se");
    e = new element.SwitchElement("e");

    switchElement.setInput(se);
    se.setInput(e);

    logic = document.createElement('span');
    logic.innerHTML += element.renderCircuitLogic([switchElement, se, e]);
    game.appendChild(logic);
})(this);
