var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var socketio = require('socket.io');

function listenner(port) {
    var this_ = this;
    this.server = http.createServer(function(req, res) {
        this_.handler(req, res);
    });
    this.server.listen(port);
    this.eventMap = {};
}

listenner.prototype.on = function(event, cb) {
    this.eventMap[event] = cb;
}


listenner.prototype.invoke = function(event, res) {
    console.log('\x1b[32m call function with  \x1b[0m', event);
    var cb = this.eventMap[event];
    if (cb) {
        cb(res);
        res.end();
    } else {
        console.log('\x1b[31m no function attach by event %s  \x1b[0m', event);
    }
}


listenner.prototype.handler = function(req, res) {
    var this_ = this;
    var ip = req.socket.remoteAddress;
    var port = req.socket.remotePort;
    console.log('\x1b[33m recv from [%s:%s]  method =%s  \x1b[0m', ip, port, req.method);

    if (req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var event = JSON.parse(body);
            console.log('\x1b[32m recv info: %s  \x1b[0m', body);
            this_.invoke(event['event'], res);
        });
    }
    if (req.method == 'GET') {
        var event = qs.parse(url.parse(req.url).query);
        this_.invoke(event['event'], res);
        res.end();
    }
}

var qs = require('querystring');


function notify(op, cb) {
    this.op = op;
    this.cb = cb;
    this.options = {
        'hostname': op.hostname,
        'port': op.port,
        'path': '/?'
    }

}

notify.prototype.send = function(data, sendType) {
    var this_ = this;
    if (sendType.toLowerCase() == 'get') {
        this.options.method = 'get';
        this.options['path'] += qs.stringify(data);
    } else if (sendType.toLowerCase() == 'post') {
        this.options.method = 'post';
    }
    this.client = http.request(this.options, function(res) {
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
    this.client.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    if (sendType.toLowerCase() == 'post') {
        this.client.write(JSON.stringify(data));
    }
    this_.client.end();

}


module.exports.Listenner = listenner;
module.exports.Notify = notify;