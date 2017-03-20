var duplicates = require('./duplicates');

var express = require('express');
var app = express();


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

app.listen(3000, function() {
    console.log('Started on port 3000');
});