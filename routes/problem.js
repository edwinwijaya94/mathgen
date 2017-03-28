var express = require('express');
var router = express.Router();
var http = require('http');
var helper = require('../utils/helper');
var chalk = require('chalk');

// create new problem
router.get('/create', function(req, res, next) {

    //GET /api/course
    helper.reqLocal('/api/course', 'GET', function(jsonRes) {
        var data = {};
        data.courseList = jsonRes.data;
        console.log(chalk.green(JSON.stringify(data)));
        res.render('problem/form', {title: 'Mathgen | Create Problem', data: data });
    });
});

// show problem list
router.get('/view', function(req, res, next) {
    
	//GET /api/problem
    helper.reqLocal('/api/problem', 'GET', function(jsonRes) {
        res.render('problem/index', {title: 'Mathgen | Problems', data: jsonRes.data});
    });

});

// edit problem
router.get('/edit', function(req, res, next) {
    var problemId = req.query.problem_id;

    //GET /api/course
    helper.reqLocal('/api/course', 'GET', function(course) {
        var courseList = course.data;
        helper.reqLocal('/api/problem?problem_id='+problemId, 'GET', function(jsonRes) {
            var data = jsonRes.data[0];
            data.courseList = courseList;
            res.render('problem/form', {title: 'Mathgen | Edit Problem', data: data});
        });
    });
});

// show generated problem 
router.get('/generate', function(req, res, next) {

    var problemId = req.query.problem_id;

    //GET /api/problem
    helper.reqLocal('/api/generator/generate?problem_id='+problemId, 'GET', function(jsonRes) {
        res.render('problem/generated', {title: 'Mathgen | Problems', data: jsonRes.data});
    });
});

module.exports = router;
