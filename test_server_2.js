var express = require('express');
var app = express();
var port = 8003;

app.get('/', function (req, res) {
  res.send('Hello World from port '+port+'!');
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
