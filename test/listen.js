var listenner = require('../index.js').Listenner;

var listen = new listenner(3000);

listen.on('dataChanged', function(client) {
    client.write('OK nofify event recved!');
});