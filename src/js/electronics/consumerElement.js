define(["element", "utils"], function(electronicElement, utils) {
    "use strict";
    var ConsumerElement,
        ceProto;

    ConsumerElement = function(name) {
        var that;
        ConsumerElement.count += 1;
        that = this;
        that._name = name + '-' + ConsumerElement.count;
        that._type = 'consumer';
        that._input = null;
        that._tile = null;
    };
    utils.inherit(ConsumerElement, electronicElement.ElectronicElement);
    ConsumerElement.prototype.render = function(config) {
        var g, prop, props, height, width, leftBorderCenter, origin, inbound, inboundLength, lamp, lampRadius, lampCross;
    
            config = config || {};
            this._tile = config.bb.slice();
            height = config.bb[3] - config.bb[1];
            width = config.bb[2] - config.bb[0];
            leftBorderCenter = config.bb[1] + height / 2;
            origin = config.bb[0] + ' ' + (0.5 * height);
    
            inboundLength = 0.2 * width;
            lampRadius = 0.3 * width;
    
            g = document.createElement('g');
    
            inbound = document.createElement('path');
            inbound.setAttribute('d', 'm' + config.bb[0] + ' ' + leftBorderCenter + 'h' + inboundLength);
            g.appendChild(inbound);
    
            lamp = document.createElement('circle');
            props = {
                'r': lampRadius + '',
                'cx': (config.bb[0] + inboundLength + lampRadius) + '',
                'cy': leftBorderCenter + '',
            }
            for (prop in props) {
                if (props.hasOwnProperty(prop)) {
                    lamp.setAttribute(prop, props[prop]);
                }
            }
            g.appendChild(lamp);
    
            lampCross = document.createElement('path');
            lampCross.setAttribute("d", "m" + (config.bb[0] + inboundLength + (lampRadius / 3)) + " " + (config.bb[1] + height / 3) + " l " + (6 * lampRadius / 4) + " " + (4 * lampRadius / 3));
            g.appendChild(lampCross);
            lampCross = document.createElement('path');
            lampCross.setAttribute("d", "m" + (config.bb[0] + inboundLength + (+ 1 * lampRadius / 3)) + " " + (config.bb[1] + height / 3 + (4 * lampRadius / 3)) + "l " + (3 * lampRadius / 2) + " " + (-4 * lampRadius / 3));
            g.appendChild(lampCross);
            return g;
    };

    ConsumerElement.count = 0;

    return {
        ConsumerElement: ConsumerElement,
    };
});
