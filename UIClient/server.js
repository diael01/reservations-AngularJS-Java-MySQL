var express = require('express');
//var logfmt = require("logfmt");
var app=express();
var path=require('path');
//app.use(logfmt.requestLogger());
//app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname));

app.get('/', function (req,res) {
//res.sendFile(path.join(__dirname, '/index.html'));
//res.sendFile(path.join(__dirname, '/content/bootstrap.min.css'));
  //res.sendFile('.app/index.html');
  res.sendFile('/index.html');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
  console.log("Directory = " + __dirname);
});
//app.listen(10001);
//console.log('server listening on port 10001 ' +__dirname);


//app.use('/static', express.static(path.join(__dirname, 'public')))