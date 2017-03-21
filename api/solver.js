var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Problem = require('../model/problem');
var chalk = require('chalk');
var mathjs = require('mathjs');

//check problem answer
router.post('/check', function(req, res) {
	
	var problemId = req.body.problemId;
	var values = req.body.values;
  	var userAnswer = req.body.answer;

  	Problem.findOne({_id: problemId}, 'formula', function (err, problem) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			
			var formula = problem.formula;
			var answer = mathjs.eval(formula, JSON.parse(values));
			var data = {};

			if(answer == Number(userAnswer)) {
				data.result = "true";
				data.message = "Correct Answer";
			} else {
				data.result = "false";
				data.message = "Wrong Answer";
			}

			res.json({
				status: "success",
				data: data
			})
		}
	});
});

module.exports = router;
