![listenner Logo](https://raw.github.com/hapijs/boom/master/images/boom.png)

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
