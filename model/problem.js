var mongoose = require('mongoose');
var chalk = require('chalk');

var problemSchema = mongoose.Schema({
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
        topic: String,
        // type: String,
        template: String,
        seedValue: [Number],
        formula: String,
        // creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    });
module.exports = mongoose.model('Problem', problemSchema);
