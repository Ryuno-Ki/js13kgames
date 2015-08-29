(function(global) {
    "use strict";
    global.addEventListener('load', function() {
        var hrefs, srcs, assets, asset, i, len, href, addr, sizes, fetchSize, pushToSizes;

        hrefs = document.querySelectorAll('[href]');
        srcs = document.querySelectorAll('[src]');

        assets = [{src: global.location.href + "index.html"}];
        for (i = 0, len = hrefs.length; i < len; i += 1) {
            href = hrefs[i];
            if (href.nodeName !== "A") {
                assets.push(hrefs[i]);
            }
        }
        for (i = 0, len = srcs.length; i < len; i += 1) {
            assets.push(srcs[i]);
        }

        sizes = [];
        fetchSize = function(source, callback) {
            var xhr, headers, size;

            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    headers = xhr.getAllResponseHeaders();
                    size = {};
                    size[source] = parseInt(headers.match(/Content-Length: (\d+)/)[1], 10);
                    callback(size);
                }
            };
            xhr.open('HEAD', source);
            xhr.send(null);
        };

        pushToSizes = function(size) {
            sizes.push(size);
        };

        for (i = 0, len = assets.length; i < len; i += 1) {
            asset = assets[i];
            addr = asset.href ? asset.href : asset.src;
            fetchSize(addr, pushToSizes);
        }
        setTimeout(function() {
            var size, i, len, prop, p, sum;

            sum = 0;
            for (i = 0, len = sizes.length; i < len; i += 1) {
                size = sizes[i];
                for (prop in size) {
                    if (size.hasOwnProperty(prop)) {
                        p = document.createElement('p');
                        p.innerHTML = prop + ': ' + size[prop];
                        document.body.appendChild(p);
                        sum += size[prop];
                    }
                }
            }
            document.body.appendChild(document.createTextNode('Gesamt: ' + sum + ' (' + 100 * sum/13312 + ' %)'));
        }, 1000);
    }, false);
})(this);
