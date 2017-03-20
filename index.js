var duplicates = require('./lib/duplicates');
var express = require('express');
var app = express();

const port = 3000;

app.get('/:attrib/duplicates', function(request, response) {
    duplicates.getDuplicates(request.params.attrib, function(duplicates) {
        response.send(JSON.stringify(duplicates));
    });

});

app.get('/:attrib/duplicates/count', function(request, response) {
    duplicates.getDuplicatesCount(request.params.attrib, function(duplicates) {
        response.send(JSON.stringify(duplicates));
    });

});

app.listen(port, function() {
    console.log('Started on port ' + port);
});