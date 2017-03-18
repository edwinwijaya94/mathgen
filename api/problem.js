var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../utils/mongodb').getModel(mongoose);
var chalk = require('chalk');

//create new problem
router.post('/', function(req, res) {
	var data = req.body;
	console.log(chalk.green(JSON.stringify(data)));
	var problem = new models.Problem({
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
	var Problem = models.Problem;
	Problem.find(function (err, problems) {
		if (err) return console.error(err);
		res.json({
			data: problems
		})
	});
});

module.exports = router;