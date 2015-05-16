(function(ext) {

    function myRequire( url ) {
        var ajax = new XMLHttpRequest();
        ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
        ajax.onreadystatechange = function () {
            var script = ajax.response || ajax.responseText;
            if (ajax.readyState === 4) {
                switch( ajax.status) {
                    case 200:
                        eval.apply( window, [script] );
                        console.log("script loaded: ", url);
                        break;
                    default:
                        console.log("ERROR: script not loaded: ", url);
                }
            }
        };
        ajax.send(null);
    };

    myRequire("https://cdn.socket.io/socket.io-1.3.4.js");

    var socket = null;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    var device = "NOT CONNECTED";

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.test_func = function() {
        Console.log("TEST!")
    };

    ext.test_func2 = function() {
        alert("TEST! [" + device + "]");

        if(!socket) {
            alert("CONNECTING")
            socket = io.connect("localhost:7666");
        }

        socket.emit('test', {'hello': 'world'});

        // var xmlHttp = new XMLHttpRequest();
        // xmlHttp.open( "GET", "http://localhost:7666/forward/0/10", false );
        //xmlHttp.send( null );

        socket.on('test', function(data) {
            alert(data);
        };

        return "";
    };



    // Block and block menu descriptions
    var descriptor = {
        blocks: [
         ['', 'test', 'test_func'],
         ['', 'test2', 'test_func2']
        ]
    };



    ext._deviceConnected = function(dev) {
        alert("Connected");
        //if(device) return;

        device = "CONNECTED";

        //device = dev;
        // device.open();

        // poller = setInterval(function() {
        //     rawData = device.read();
        // }, 20);
    };


    ext._deviceRemoved = function(dev) {
        alert("Removed");

        device = "NOT CONNECTED";
    };

    var hid_info = {type: 'hid', vendor: 0x1040, product: 0x8006};
    ScratchExtensions.register('Roamer', descriptor, ext, hid_info);
})({});