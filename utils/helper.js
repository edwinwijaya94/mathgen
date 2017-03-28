var chalk = require('chalk');
var express = require('express');
var http = require('http');

var exports = {};

exports.reqLocal = function(path, method, callback) {

    var options = {
        host : 'localhost',
        port : process.env.PORT || 3000,
        path : path,
        method : method,
        headers: {'Content-Type':'application/json'}
    };
    var call = http.request(options, function(response) {
        response.setEncoding('utf8');
        var str ="";
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function(d) {
            var jsonRes = JSON.parse(str);
            callback(jsonRes);
        });
    });
    call.end();
    call.on('error', function(err) {
        console.log(chalk.red(err));
    });
}

module.exports = exports;