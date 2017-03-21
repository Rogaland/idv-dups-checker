var duplicates = require('./lib/duplicates');
var express = require('express');
var app = express();

const port = 3000;

app.get('/api/:attrib/duplicates', function(request, response) {
    try {
        duplicates.getDuplicates(request.params.attrib, function(duplicates) {
            response.send(JSON.stringify(duplicates));
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get('/api/duplicates/count/:attrib', function(request, response) {
    try {
        duplicates.getDuplicatesCount(request.params.attrib, function(duplicates) {
            response.send(JSON.stringify(duplicates));
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.use(express.static('dist'));

app.listen(port, function() {
    console.log('Started on port ' + port);
});