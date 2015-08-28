(function(global, app) {
    "use strict";
    // Now app === global.JS13KBP
    global.JS13KBP = (function() {
        var utils, myUtils;

        // Dependencies
        js13kUtils = global.JS13KBP.utils;

        // Private stuff, using e.g. js13kUtils
        var myUtils = "load module here";

        // Public API
        return {
            utils: function() {
                return myUtils;
            }
        }
    })();
})(this, JS13kBP)
