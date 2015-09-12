define(["app/element", "app/svg",
       "app/electronics/powerSourceElement", "app/electronics/switchElement", "app/electronics/consumerElement", "app/electronics/circuitElement"],
       function(element, svg, powerSourceElement, switchElement, consumerElement, circuitElement) {
           "use strict";
           var game, pse, sw, c, ci;

           game = document.getElementById("game");
           console.log(game, element, switchElement, svg);
           pse = new powerSourceElement.PowerSourceElement("power-source");
           sw = new switchElement.SwitchElement("switch-element");
           c = new consumerElement.ConsumerElement("consumer");
           ci = new circuitElement.CircuitElement("circuit");
       
           sw.setInput(pse);
           ci.addPowerSource(pse);
           ci.addElectronic(sw);
           ci.addConsumer(c);
           svg.el.appendChild(svg.renderPowerSource({
               id: "power-source",
               bb: [0, 0, 25, 25],
           }));
           svg.el.appendChild(svg.renderSwitchElement({
               id: "switch",
               bb: [25, 0, 50, 25],
           }));
           svg.el.appendChild(svg.renderCable({
               id: "cable",
               inbound: [50, 12.5],
               outbound: [75, 87.5],
           }));
           svg.el.appendChild(svg.renderConsumer({
               id: "consumer",
               bb: [75, 75, 100, 100],
           }));
           game.appendChild(svg.el);
           svg.el.outerHTML = svg.el.outerHTML;  // Enforce repaint
       
           // svg.dragAndDrop(game.getElementsByTagName('g'));

           console.log(game, svg, sw);
          return {};
       }
);
/*
    logic = document.createElement('div');
    logic.innerHTML += circuit.renderCircuitLogic();
    // game.appendChild(logic);
*/
