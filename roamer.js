(function(ext) {

    var commandCount = 0;
    var base = "http://localhost:7666";
    var urlFor = function(u, a) {
        commandCount = commandCount + 1;
        return base + "/" + u + "/" + commandCount + "/" + a;
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.test_func = function() {
        console.log("TEST!")
    };

    ext.test_func2 = function() {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            console.log("Command result: " + xmlHttp.readyState + "/" + xmlHttp.status );
            alert("Command result: " + xmlHttp.readyState + "/" + xmlHttp.status);
        };

        xmlHttp.open("GET", urlFor("forward", 10), true);
        xmlHttp.send();

        return null;
    };



    // Block and block menu descriptions
    var descriptor = {
        blocks: [
         ['', 'test', 'test_func'],
         ['', 'test2', 'test_func2']
        ]
    };

    ScratchExtensions.register('Roamer', descriptor, ext);
})({});