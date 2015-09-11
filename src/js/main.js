define(["js/element", "js/svg"],
       function(element, svg) {
           "use strict";
           var game, pse, sw, c, ci;

           /*
           game = document.getElementById("game");
           console.log(game, element, svg);
           pse = new element.PowerSourceElement("power-source");
           sw = new element.SwitchElement("switch-element");
           c = new element.ConsumerElement("consumer");
           ci = new element.CircuitElement("circuit");
       
           sw.setInput(pse);
           ci.addPowerSource(pse);
           ci.addElectronic(sw);
           ci.addConsumer(c);
           game.appendChild(svg.el);
           */
          return {};
       }
);
/*
    // Shorthands
    app = global.JS13KBP;
    element = app.element;
    svg = app.svg;

    logic = document.createElement('div');
    logic.innerHTML += circuit.renderCircuitLogic();
    // game.appendChild(logic);

    svg.svg.appendChild(svg.renderSwitchElement({
        id: se.getType(),
        bb: [25, 0, 50, 25],
    }));
    svg.svg.appendChild(svg.renderCable({
        id: "cable",
        inbound: [50, 12.5],
        outbound: [75, 87.5],
    }));
    svg.svg.appendChild(svg.renderConsumer({
        id: c.getType(),
        bb: [75, 75, 100, 100],
    }));
    svg.svg.outerHTML = svg.svg.outerHTML;  // Enforce repaint

    svg.dragAndDrop(game.getElementsByTagName('g'));
})(this);
*/
