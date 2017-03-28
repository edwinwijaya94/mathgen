var mongoose = require('mongoose');
var chalk = require('chalk');

var courseSchema = mongoose.Schema({
        name: String
    });
module.exports = mongoose.model('Course', courseSchema);
