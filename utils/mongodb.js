var mongoose = require('mongoose');
var chalk = require('chalk');
var express = require('express');
var app = require('../app');

var exports = {};

exports.init = function() {
    var env = process.env.NODE_ENV || 'development';
    if (env === 'development') 
	   mongoose.connect('mongodb://localhost/mathgen');
    else if (env === 'production')
        mongoose.connect('mongodb://mathgen:mathgen@ds137090.mlab.com:37090/mathgen');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(chalk.green('MongoDB: init success'));
    });
}

module.exports = exports;