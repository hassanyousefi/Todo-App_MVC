

// var static = require('node-static');
// var http = require('http');

// var file = new(static.Server)();

// http.createServer(function (req, res) {
//   file.serve(req, res);
// }).listen(8080);



// var fs = require('fs'),
//     http = require('http');

// http.createServer(function (req, res) {
//   fs.readFile(__dirname + req.url, function (err,data) {
//     if (err) {
//       res.writeHead(404);
//       res.end(JSON.stringify(err));
//       return;
//     }
//     res.writeHead(200);
//     res.end(data);
//   });
// }).listen(8080);



var http = require("http");
var handler = require('./req-handler').requestHandler;
http.createServer(handler).listen(8080);