![listenner Logo](https://github.com/xzmagic/listenner/blob/master/listennerLogo.png)

Lead Maintainer: [xzmagic](https://github.com/xzmagic)

## server

```js
var listenner = require('../index.js').Listenner;

var listen = new listenner(3000);

listen.on('dataChanged', function(client) {
    client.write('OK nofify event recved!');
});
```

## client

```js
var Notify = require('../index.js').Notify;

var notify = new Notify({
    'hostname': '127.0.0.1',
    'port': 3000
});

var data = {
    'event': 'dataChanged'
}

notify.send(data, 'get');
```

##output:
###server
```js
 recv from [::ffff:127.0.0.1:19475]  method =GET
 call function with   dataChanged
```

###client

```js
Status: 200
Headers: {"date":"Wed, 26 Jul 2017 13:55:16 GMT","connection":"close","transfer-encoding":"chunked"}
recv rsp =  OK nofify event recved!
```
<<<<<<< HEAD

## Pull  
###subscribe message from a Push node point to point  ,if you have multi Pull node  call ext() with Pull  let Pull upgrade  to a broadcast Pull node,
###then multi Pull node can receive message from a Push node;
```js
var listenner = require('listenner');
var Pull = listenner.Pull;
var eventPull = new Pull();
eventPull.ext();
eventPull.connect('127.0.0.1', config.dbchange.zmqPort);
eventPull.on('message', function (message) {
console.log("recv  zmq message " + message);
if (message == "dataChanged")
    this_.freshMe();
});
```

## Push  
###push message to  Pull node  point to point, if you have multi Pull node  call ext() with Push let Push upgrade  to a broadcast Push node,
###then you can use Push node  push message to  all pull nodes
```js
var Listenner = require('listenner').Listenner;
var Push = require('listenner').Push;
var config = require('./config.js');

var dbListenner = new Listenner(config.dbchange.httpPort);
var eventPush = new Push();
eventPush.ext();
eventPush.bind(config.dbchange.zmqPort);

dbListenner.on('dataChanged', function (client) {
    client.write('OK nofify event recved!');
    eventPush.sendMessage("dataChanged");
});
```
=======
>>>>>>> 3daf636322e3c8ec5122f053b7c9d91dd20b7099
