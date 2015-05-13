(function(ext) {
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
        alert("TEST! " + device);
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