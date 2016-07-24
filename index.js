// http://stackoverflow.com/questions/25896608/nodejs-routing-table-using-http-proxy

var http = require('http'),
httpProxy = require('http-proxy'),
url = require('url');

listeningPort = 8080;

/*
setting up /etc/hosts for the sake of testing

127.0.0.1 _www.knalledge.org
127.0.0.1 _api.knalledge.org
127.0.0.1 _topichat.knalledge.org

 */

proxy = httpProxy.createProxyServer({}),

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;

    console.log("hostname: ", hostname);
    console.log("pathname: ", pathname);

    switch(hostname)
    {
        // http://superuser.com/questions/152146/how-to-alias-a-hostname-on-mac-osx

        // node backend
        case 'api.knalledge.org':
            proxy.web(req, res, { target: 'http://localhost:8001' });
            break;

        case 'topichat.knalledge.org':
            proxy.web(req, res, { target: 'http://127.0.0.1:8002' });
            break;

            // Apache
            case 'knalledge.org':
            case 'www.knalledge.org':
            case '127.0.0.1':
            default:
                proxy.web(req, res, { target: 'http://localhost:8000' });
                break;
    }
}).listen(listeningPort, function() {
    console.log('proxy listening on port: ', listeningPort);
});
