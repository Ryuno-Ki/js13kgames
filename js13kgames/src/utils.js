(function(global) {
    var utils;

    /* API */
    utils = {
        on: null,
        off: null
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
})(this)
