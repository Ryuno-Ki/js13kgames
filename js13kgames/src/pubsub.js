(function(global) {
    'use strict';
    var pubsub;

    pubsub = {
        publisher: null,
        makePublisher: null
    }

    pubsub.publisher = {
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

    // Example: pub = {
    //     method1: function() {
    //         this.publish('Message of method1');
    //     },
    //     method2: function() {
    //         this.publish('Message of method2');
    //     },
    // };
    // makePublisher(pub);
    // sub = {
    //     callback1: function(msg) {
    //         console.log('Message from pub: ', msg);
    //     },
    //     callback2: function(msg) {
    //         console.log('Message from pub: ', msg);
    //     }
    // };
    // pub.subscribe(sub.callback1);
    // pub.subscribe(sub.callback2, 'methods2');
    // pub.method1();
    // pub.methods2();
    // pub can subscribe to sub to, when those became publisher!
    pubsub.makePublisher = function(obj) {
        var prop, publisher;

        publisher = pubsub.publisher;

        for (prop in publisher) {
            if (publisher.hasOwnProperty(prop) && typeof publisher[prop] === "function") {
                obj[prop] = pubslisher[prop];
            }
        }

        obj.subscribers = {any: []};
    };
})(this)
