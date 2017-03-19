var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Problem = require('../model/problem');
var chalk = require('chalk');


//personal chat to other user
router.get('/generate', function(req, res) {
	
  	var problemId = req.query.problem_id;
  	Problem.findOne({_id: problemId}, '_id problemSet name template seedValue', function (err, problem) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			//convert to object for manipulating json
			problem = problem.toObject();

			//generate problem
			var re = /<[a-z]>/g;
			var str = problem.template;
			var i = 0;
			while ((match = re.exec(str)) != null) {
				str = str.substr(0, match.index) + problem.seedValue[i] + str.substr(match.index+3);
				i++;
			}

			delete problem.template;
			problem.problem = str;

			res.json({
				status: "success",
				data: problem
			})
		}
	});
});

module.exports = router;
