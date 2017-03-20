#!/usr/bin/env node

var ldap = require('ldapjs');
var assert = require('assert');
var _ = require('lodash');

var getDuplicates = function(attribute, callback) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);

        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: [attribute, 'givenName', 'sn', 'cn', 'mail']
        };

        client.search(process.env.LDAP_BASE, opts, function(err, res) {
            assert.ifError(err);

            var users = [];
            res.on('searchEntry', function(entry) {
                users.push(entry.object);
            });

            res.on('end', function() {
                var keys = _(users).pickBy(function(user) {
                    if (user[attribute]) return user[attribute];
                }).groupBy(function(user) {
                    if (Array.isArray(user[attribute])) {
                        return user[attribute][0].toLowerCase();
                    } else {
                        return user[attribute].toLowerCase();
                    }

                }).pickBy(count => count.length > 1).keys().value();
                var values = [];
                var filter = {};

                keys.forEach(key => {
                    if (key !== "undefined") {
                        var filteredUsers = _(users).pickBy(function(user) {
                            if (user[attribute]) return user[attribute];
                        }).filter(function(user) {
                            if (Array.isArray(user[attribute])) {
                                return user[attribute][0].toLowerCase() === key.toLowerCase();
                            } else {
                                return user[attribute].toLowerCase() === key.toLowerCase();
                            }
                        }).values();

                        var value = {};
                        value[attribute] = key;
                        value.users = filteredUsers;

                        values.push(value);
                    }
                });

                client.destroy();
                var duplicates = {
                    dupscount: values.length,
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

var getDuplicatesCount = function(attribute, callback) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);

        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: [attribute]
        };

        client.search(process.env.LDAP_BASE, opts, function(err, res) {
            assert.ifError(err);

            var users = [];
            res.on('searchEntry', function(entry) {
                users.push(entry.object);
            });

            res.on('end', function() {
                var keys = _(users).pickBy(function(user) {
                    if (user[attribute]) return user[attribute];
                }).groupBy(function(user) {
                    if (Array.isArray(user[attribute])) {
                        return user[attribute][0].toLowerCase();
                    } else {
                        return user[attribute].toLowerCase();
                    }
                }).pickBy(count => count.length > 1).keys().value();
                client.destroy();
                var duplicates = {
                    dupscount: keys.length
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