var mongoose = require('mongoose');
var chalk = require('chalk');

var problemSchema = mongoose.Schema({
        problemSet: String,
        name: String,
        template: String,
        seedValue: [Number],
        formula: String
    });
module.exports = mongoose.model('Problem', problemSchema);
