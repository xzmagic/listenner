var Notify = require('../index.js').Notify;

var notify = new Notify({
    'hostname': '127.0.0.1',
    'port': 3000
});

var data = {
    'event': 'dataChanged'
}

notify.send(data, 'get');