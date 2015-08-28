(function(global) {
    'use strict';
    var utils;

    /* API */
    utils = {
        on: null,
        off: null
        namespace: null
    };

    /* Init time branching to determine implementation on first parsing */
    utils.on = function(el, type, fn) {
        if (typeof window.addEventListener === 'function') {
            utils.on = function(el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else if (typeof document.attachEvent === 'function') { // IE
            utils.on = function(el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
        } else { // Elder browser
            utils.on = function(el, type, fn) {
                el['on' + type] = fn;
            };
        }
    };

    /* Init time branching to determine implementation on first parsing */
    utils.off = function(el, type, fn) {
        if (typeof window.removeEventListener === 'function') {
            utils.off = function(el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else if (typeof document.detachEvent === 'function') { // IE
            utils.off = function(el, type, fn) {
                el.detachEvent('on' + type, fn);
            };
        } else { // Elder browser
            utils.off = function(el, type, fn) {
                el['on' + type] = null;
            };
        }
    };

    // Example: JS13kBP.utils.namespace('once.upon.a.time.there.was.this.long.nested.property');
    utils.namespace = function(ns_string) {
        var parts, part, parent, i, len;

        parts = ns_string.split('.');
        parent = 'JS13KBP';

        // Remove leading namespace when redundant
        if (parts[0] === parent) {
            parts = parts.slice(1);
        }

        for (i = 0, len = parts.length; i < len, i += 1) {
            // Create property if undefined
            part = parts[i];
            if (typeof parent[part] === 'undefined') {
                parent[part] = {};
            }
            parent = parent[part];
        }
        return parent;
    };
})(this)
