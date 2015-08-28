(function(global) {
    'use strict';
    var publisher;

    publisher = {
        subscribers: {
            any: []
        },
        subscribe: function(fn, type) {
            // fn callback when type was emitted
            type = type || 'any';
            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        unsubscribe: function(fn, type) {
            this.visitSubscribers('unsubscribe', fn, type);
        },
        publish: function(publication, type) {
            this.visitSubscribers('publish', publication, type);
        },
        visitSubscribers: function(action, arg, type) {
            // helper
            var pubtype, subscribers, subscriber, i, max;

            pubtype = type || 'any';
            subscribers = this.subscribers[pubtype];
            max = subscribers.length;

            for (i = 0; i < max; i += 1) {
                subscriber = subscribers[i];
                if (action === 'publish') {
                    subscriber(arg);  // Invoke callback
                } else {
                    if (subscriber === arg) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };
})(this)
