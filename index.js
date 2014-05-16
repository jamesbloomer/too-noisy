var hark = require('hark'),
    getUserMedia = require('getusermedia'),
    queryString = require('query-string')

var qs = queryString.parse(location.search);

getUserMedia(function(err, stream) {
    if (err) {
       console.error(err);
       throw err;
    }

    var options = {
        interval: qs.interval|| 1000,
        threshold: qs.threshold || -46
    };

    var harkEvents = hark(stream, options);

    harkEvents.on('volume_change', function(volume) {
        document.querySelector("#level").textContent = volume;
    });

    // Rather than speaking the threshold is the unacceptable level
    harkEvents.on('speaking', function() {
        document.querySelector("#status").textContent = "Too noisy!";
    });

    harkEvents.on('stopped_speaking', function() {
        document.querySelector("#status").textContent = "Nice and quiet";
    });
});
