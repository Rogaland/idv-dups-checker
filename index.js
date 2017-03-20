var duplicates = require('./duplicates');

var express = require('express');
var app = express();

app.get('/nin/duplicates', function(request, response) {
    duplicates.getDuplicates(function(duplicates) {
        response.send(JSON.stringify(duplicates));
    });

});

app.get('/nin/duplicates/count', function(request, response) {
    duplicates.getDuplicatesCount(function(duplicates) {
        response.send(JSON.stringify(duplicates));
    });

});

app.listen(3000, function() {
    console.log('Started on port 3000');
});