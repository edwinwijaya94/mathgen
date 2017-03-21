var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Problem = require('../model/problem');
var chalk = require('chalk');

//generate problem based on template
router.get('/generate', function(req, res) {

  	var problemId = req.query.problem_id;
  	Problem.findOne({_id: problemId}, '_id course topic template seedValue', function (err, problem) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			//convert to object for manipulating json
			problem = problem.toObject();

			//generate problem
			var re = /'[a-z]'/g;
			var str = problem.template;
			var i = 0;
			var values = {};
			while ((match = re.exec(str)) != null) {
				// console.log(chalk.green("prev="+str));
				// console.log(chalk.green("m="+match.index));
				values[str[match.index+1]] = problem.seedValue[i];
				str = str.substr(0, match.index) + problem.seedValue[i] + str.substr(match.index+3);
				// console.log(chalk.green("after="+str));
				re.lastIndex = 0;
				i++;
			}

			delete problem.template;
			problem.problem = str;
			problem.values = values; //generated values for variables

			res.json({
				status: "success",
				data: problem
			})
		}
	});
});

module.exports = router;
