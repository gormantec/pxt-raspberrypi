(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-raspberrypi/",
    "verprefix": "",
    "workerjs": "/pxt-raspberrypi/worker.js",
    "monacoworkerjs": "/pxt-raspberrypi/monacoworker.js",
    "gifworkerjs": "/pxt-raspberrypi/gifjs/gif.worker.js",
    "pxtVersion": "5.11.6",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-raspberrypi/",
    "commitCdnUrl": "/pxt-raspberrypi/",
    "blobCdnUrl": "/pxt-raspberrypi/",
    "cdnUrl": "/pxt-raspberrypi/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "raspberrypi",
    "simUrl": "/pxt-raspberrypi/simulator.html",
    "partsUrl": "/pxt-raspberrypi/siminstructions.html",
    "runUrl": "/pxt-raspberrypi/run.html",
    "docsUrl": "/pxt-raspberrypi/docs.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-raspberrypi/highlight.js/highlight.pack.js",
        "/pxt-raspberrypi/bluebird.min.js",
        "/pxt-raspberrypi/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-raspberrypi/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-raspberrypi/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-raspberrypi/target.js");
    scripts.push("/pxt-raspberrypi/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
