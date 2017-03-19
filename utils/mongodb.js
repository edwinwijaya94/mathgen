var mongoose = require('mongoose');
var chalk = require('chalk');

var exports = {};

exports.init = function() {
	mongoose.connect('mongodb://localhost/mathgen');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(chalk.green('MongoDB: init success'));
    });
}

module.exports = exports;