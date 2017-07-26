var qs = require('querystring');
var http = require('http');
var optionsGET = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'get',
    path: '/?' + qs.stringify({
        'event': 'dataChanged'
    })
};

var optionsPOST = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'post',
    path: '/?'
};

var client = http.request(optionsGET, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var rsp = '';
    res.on('data', function(chunk) {
        rsp += chunk;
    });

    res.on('end', function() {
        console.log("recv rsp = ", rsp);
    })
});

client.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

var data = {
    'event': 'dataChanged'
};

client.write(JSON.stringify(data));
client.end();