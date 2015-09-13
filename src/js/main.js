define(["element",
        "svg",
        "electronics/powerSourceElement",
        "electronics/switchElement",
        "electronics/consumerElement",
        "electronics/circuitElement"],
       function(element, svg, powerSourceElement, switchElement, consumerElement, circuitElement) {
           "use strict";
           var game, grid, getRandomTile, tile, element, elements, usedTiles;
           var explanations, explanation, explanationSvg, i, len, circuit;

           game = document.getElementById("game");
           /* The vertices of the grid are:
            * (  0,  0) -- ( 25,  0) -- ( 50,  0) -- ( 75,  0) -- (100,  0)
            *     |            |            |            |            |
            * (  0, 25) -- ( 25, 25) -- ( 50, 25) -- ( 75, 25) -- (100, 25)
            *     |            |            |            |            |
            * (  0, 50) -- ( 25, 50) -- ( 50, 50) -- ( 75, 50) -- (100, 50)
            *     |            |            |            |            |
            * (  0, 75) -- ( 25, 75) -- ( 50, 75) -- ( 75, 75) -- (100, 75)
            *     |            |            |            |            |
            * (  0,100) -- ( 25,100) -- ( 50,100) -- ( 75,100) -- (100,100)
            */
           grid = [
               [  0,   0,  25, 25], [ 25,  0, 50, 25], [ 50,  0, 75, 25], [ 75,  0,100, 25],
               [  0,  25,  25, 50], [ 25, 25, 50, 50], [ 50, 25, 75, 50], [ 75, 25,100, 50],
               [  0,  50,  25, 75], [ 25, 50, 50, 75], [ 50, 50, 75, 75], [ 75, 50,100, 75],
               [  0,  75,  25,100], [ 25, 75, 50,100], [ 50, 75, 75,100], [ 75, 75,100,100]
           ];
           getRandomTile = function(grid) {
               var rows;
               rows = grid.length;
               return grid[Math.floor(rows * Math.random(rows))];
           };
           usedTiles = [];

           elements = {
               PowerSourceElement: new powerSourceElement.PowerSourceElement(),
               SwitchElement: new switchElement.SwitchElement(),
               ConsumerElement: new consumerElement.ConsumerElement(),
           }
           circuit = new circuitElement.CircuitElement(),
           elements.SwitchElement.setInput(elements.PowerSourceElement);
           circuit.add(elements.PowerSourceElement).add(elements.SwitchElement).add(elements.ConsumerElement);

           for (element in elements) {
               if (elements.hasOwnProperty(element)) {
                   do {
                       tile = getRandomTile(grid);
                   } while (usedTiles.indexOf(tile + '') !== -1);
                   usedTiles.push(tile + '');
                   svg.el.appendChild(svg.render(elements[element], {bb: tile}));
               }
           }
           svg.el.appendChild(svg.renderCable({
               from: elements.PowerSourceElement,
               to: elements.SwitchElement,
           }));
           svg.el.appendChild(svg.renderCable({
               from: elements.SwitchElement,
               to: elements.ConsumerElement,
           }));
           game.appendChild(svg.el);
           svg.el.outerHTML = svg.el.outerHTML;  // Enforce repaint

           explanations = document.getElementsByClassName("explanation");
           for (i = 0, len = explanations.length; i < len; i += 1) {
               explanation = explanations[i];
               explanationSvg = explanation.firstElementChild;
               explanationSvg.appendChild(svg.render(elements[explanation.dataset.electronic + "Element"], {bb: [0, 0, 25, 25]}));
               explanationSvg.outerHTML = explanationSvg.outerHTML;  // Enforce repaint
           }
          return {};
       }
);
