'use strict';
// http://stackoverflow.com/questions/25896608/nodejs-routing-table-using-http-proxy

var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');

var configurationName = process.argv[2] || 'default';

var configuration = require('./config/'+configurationName);
// console.log("configuration: ", configuration);
var listeningPort = configuration.listeningPort;

// process mappings
for (var hostName in configuration.mappings){
  console.log("[web_fork] listening on host: ", hostName);
  var hostConfig = configuration.mappings[hostName];

  // adding all aliases
  if(typeof hostConfig.aliases !== 'undefined'){
    for(var aI in hostConfig.aliases){
      var hostAlias = hostConfig.aliases[aI];
      console.log("\tadded hostAlias: ", hostAlias);
      configuration.mappings[hostAlias] = hostConfig;
    }
  }
}

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;

    console.log("hostname: ", hostname);
    console.log("pathname: ", pathname);

    if(!(hostname in configuration.mappings)) hostname = 'default';

    var hostConfig = configuration.mappings[hostname];
    var hostOptions = hostConfig.options;
    if(hostConfig.options.ws){
      proxy.web(req, res, hostOptions);
    }else{
      proxy.ws(req, res, hostOptions);
    }

    if()
});

server.listen(listeningPort, function() {
    console.log('proxy listening on port: ', listeningPort);
});
