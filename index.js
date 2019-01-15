/**
*
* Nodejs Master Class - Assignment 01
* Create a Helloworld Resfull JSON API
*/


// Dependencies
var http = require('http');
var url = require('url');

// Create the server
var server = http.createServer(function(req,res){
  serverProccesing(req,res);
});

// Run the server
server.listen(3000,function(){
  console.log("The server is running on port 3000");
})

// Function for server Proccesing
var serverProccesing = function(req,res){
  var parsedUrl = url.parse(req.url,true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var header = req.header;

  var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath]: handlers.notFound;

  chooseHandler(function(statusCode,payload){
    statusCode = typeof(statusCode) == 'number'? statusCode : 200;
    payload = typeof(payload) == 'object' ? payload : {};
    var payloadString = JSON.stringify(payload);

    res.setHeader('Content-Type','application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
  });
};

// Create the handlers
var handlers = {};

handlers.hello = function(callback){
    callback(200,{'greeting': 'Hello World I am Sergio Reyes'});
}

handlers.notFound = function(callback){
  callback(404);
}

var router = {
  'hello': handlers.hello
};
