const cluster = require('cluster');

if (cluster.isMaster) {

    // Parallelism can be configured through env params
    var cpuCount = process.env.PARALLELISM || 2;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    const express = require("express");
    const app = express();
    const port = 9595

    var server = app.listen(port, () => {
        console.log("Server running on port " + port);
    });

    server.on('connection', function(socket) {
        //Below line has been added to check how many new connections are being made. This should be very few in a keep alive env
        console.log("New connection was made by client");
        socket.setTimeout(180 * 1000); 
    });

    app.get("/", (req, res, next) => {
        res.status(200).send('hello');
    });
    
    app.get("/bigpayload", (req, res, next) => {
        res.status(200).send('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');
    });

    app.get("/:reqpath", (req, res, next) => {
        let reqpath = req.params.reqpath;
        res.status(200).send(reqpath);
    });

    app.get("/service/health", (req, res, next) => {
        res.status(200).send('{"healthy":true}');
    });

    app.use(function (req,res,next){
        res.status(200).send('Unknown Path');
    });
    
}
