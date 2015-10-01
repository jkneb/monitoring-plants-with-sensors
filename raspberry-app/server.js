var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , http = require('http');


app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.static(__dirname));
});

// Arduino is connected to Raspberry through Arduino's USB cable
// serial port module retrieves data sent by Arduino
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = '/dev/ttyACM0';

// uncomment this to list all the ports if you have trouble to find yours
/*
serialport.list(function (err, ports) {
 ports.forEach(function(port) {
   console.log(port.comName);
   console.log(port.pnpId);
   console.log(port.manufacturer);
 });
});
*/

var sp = new SerialPort(port, {
  parser: serialport.parsers.readline("\n")
});

var moisture,
    temperature,
    light;

var postInterval = 300000; // in milliseconds so 300000 is 5 minutes

var APIOptions = {
  host: 'your-heroku-api.herokuapp.com', // provide your own API url here
  port: 80,
  path: '',
  headers: {"Accept":"application/json", "Content-Type":"application/json"},
  method: 'POST'
};

function postToAPI(endpoint, body){
  APIOptions.path = endpoint;
  var req = http.request(APIOptions, function(res) {
    console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  req.write(JSON.stringify(body));
  req.end();
  req.on('error', function(e) {
    console.error(e);
  });
}

sp.on('data', function(data) {
  console.log(data);
  var datum = data.replace(/^\s+|\s+$/g, '').split('|');
  console.log(datum);
  moisture = datum[0];
  temperature = datum[1];
  light = datum[2];
});

setInterval(function(){
  postToAPI('/api/moistures', {"moisture":{"value":moisture || 0}});
  postToAPI('/api/temperatures', {"temperature":{"value":temperature || 0}});
  postToAPI('/api/lights', {"light":{"value":light || 0}});
}, postInterval);



var port = process.env.PORT || 5000;
server.listen(port, function(){
  console.log("Listening on " + port);
});
