var mongoose = require('mongoose');
var chalk = require('chalk');

var exports = {};

exports.init = function() {
	mongoose.connect('mongodb://localhost/mathgen');
	console.log(chalk.green('MongoDB: init success'));
}

exports.getModel = function(mongoose) {
    var problemSchema = mongoose.Schema({
    	problemSet: String,
        name: String,
    	template: String,
    	seedValue: [Number],
    	formula: String
	});
    var models = {
      Problem : mongoose.model('Problem', problemSchema)
    };
    return models;
}

module.exports = exports;