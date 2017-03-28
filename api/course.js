var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = require('../model/course');
var chalk = require('chalk');

// CRUD
//create new course
router.post('/', function(req, res) {

	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));

	//check if course exists
	var query = {};
	query.name = data.name;
	Course.find(query, function (err, courseData) {
		if (err) {
			console.log(chalk.red(err));
			res.json({
				status: "error"
			});
		} else {
			if(courseData.length > 0 ) {
				res.json({
					status: "error",
					message: "Course already exists"
				})
			} else {
				//create new course
				var course = new Course({
						name: data.name
    				});
				course.save(function(err) {
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
			}
		}
	});

	
});

// show courses
router.get('/', function(req, res) {

	var courseId = (req.query.course_id != null) ? req.query.course_id : null;
	var query = {};
	if(courseId != null)
		query._id = courseId;

	Course.find(query, function (err, data) {
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

//edit course
router.patch('/', function(req, res) {

	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));
	var query = { _id: data.courseId };
	var updateData = { 	
						name: data.name
					}
	Course.findOneAndUpdate(query, updateData, {new: true}, function(err, data) {
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

//delete course
router.delete('/', function(req, res) {

	var data = req.body;
	console.log(chalk.blue(JSON.stringify(data)));
	var query = { _id: data.courseId };
	Course.remove(query, function(err) {
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
