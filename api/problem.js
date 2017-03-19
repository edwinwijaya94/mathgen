var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Problem = require('../model/problem');
var chalk = require('chalk');

//create new problem
router.post('/', function(req, res) {
	var data = req.body;
	// console.log(chalk.green(JSON.stringify(data)));
	var problem = new Problem({
						problemSet: data.problemSet,
						name: data.name,
						template: data.template,
						seedValue: data.seedValue.split(','),
						formula: data.formula
    				});
	problem.save(function(err) {
		if(err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			res.json({
				status: "success"
			});
		}
	});	
});

// show problems
router.get('/', function(req, res) {
	// var Problem = Problem;
	Problem.find({}, '_id problemSet name template', function (err, problems) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			res.json({
				status: "success",
				data: problems
			})
		}
	});
});

module.exports = router;