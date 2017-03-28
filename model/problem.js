var mongoose = require('mongoose');
var chalk = require('chalk');

var problemSchema = mongoose.Schema({
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
        topic: String,
        template: String,
        seedValue: [Number],
        formula: String
    });
module.exports = mongoose.model('Problem', problemSchema);
