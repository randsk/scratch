(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
         ['', 'test', 'test', '2'],
        ]
    };

    ext.test = function() {
        Console.log("TEST!")
    }

    var device = null;
    ext._deviceConnected = function(dev) {
        Console.log("Connected");
        //if(device) return;

        //device = dev;
        // device.open();

        // poller = setInterval(function() {
        //     rawData = device.read();
        // }, 20);
    };

    var hid_info = {type: 'hid', vendor: 0x1040, product: 0x8006};
    ScratchExtensions.register('Roamer', descriptor, ext, hid_info);
})({});