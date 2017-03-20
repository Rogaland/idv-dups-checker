#!/usr/bin/env node

var ldap = require('ldapjs');
var assert = require('assert');
var _ = require('lodash');

var getDuplicates = function(callback) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);

        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: ['norEduPersonNIN', 'givenName', 'sn', 'cn', 'mail']
        };

        client.search(process.env.LDAP_BASE, opts, function(err, res) {
            assert.ifError(err);

            var users = [];
            res.on('searchEntry', function(entry) {
                users.push(entry.object);
            });

            res.on('end', function() {
                //_(users).groupBy('norEduPersonNIN').count();
                var keys = _(users).groupBy('norEduPersonNIN').pickBy(count => count.length > 1).keys().value();
                var values = [];
                keys.forEach(key => {
                    var filteredUsers = _(users).filter({
                        'norEduPersonNIN': key
                    }).values();

                    var value = {
                        fodselsnummer: key,
                        users: filteredUsers
                    };
                    values.push(value);
                });

                client.destroy();
                var duplicates = {
                    dupscount: (keys.length - 1),
                    duplicates: values
                };
                callback(duplicates);
            });

            res.on('error', function(err) {
                console.error('error: ' + err.message);
            });
        });
    });
}

var getDuplicatesCount = function(callback) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);

        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: ['norEduPersonNIN']
        };

        client.search(process.env.LDAP_BASE, opts, function(err, res) {
            assert.ifError(err);

            var users = [];
            res.on('searchEntry', function(entry) {
                users.push(entry.object);
            });

            res.on('end', function() {
                var keys = _(users).groupBy('norEduPersonNIN').pickBy(count => count.length > 1).keys().value();

                client.destroy();
                var duplicates = {
                    dupscount: (keys.length - 1)
                };
                callback(duplicates);
            });

            res.on('error', function(err) {
                console.error('error: ' + err.message);
            });
        });
    });
}

module.exports = {
    getDuplicates: getDuplicates,
    getDuplicatesCount: getDuplicatesCount
};