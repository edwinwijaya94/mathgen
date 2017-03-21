var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Problem = require('../model/problem');
var chalk = require('chalk');

// CRUD
//create new problem
router.post('/', function(req, res) {
	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));
	var problem = new Problem({
						course: data.course,
						topic: data.topic,
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

	var problemId = (req.query.problem_id != null) ? req.query.problem_id : null;
	var query = {};
	if(problemId != null)
		query._id = problemId;

	Problem.find(query, function (err, data) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			res.json({
				status: "success",
				data: data
			})
		}
	});
});

//edit problem
router.patch('/', function(req, res) {
	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));
	var query = { _id: data.problemId };
	var updateData = { 	
						course: data.course,
						topic: data.topic,
						template: data.template,
						seedValue: data.seedValue.split(','),
						formula: data.formula
					}
	Problem.findOneAndUpdate(query, updateData, {new: true}, function(err, data) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			res.json({
				status: "success",
				data: data
			})
		}
	});

});

//delete problem
router.delete('/', function(req, res) {

	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));
	var query = { _id: data.problemId };
	Problem.remove(query, function(err) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			res.json({
				status: "success",
			})
		}
	});

});

module.exports = router;