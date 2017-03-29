var express = require('express');
var router = express.Router();
var http = require('http');
var helper = require('../utils/helper');
var chalk = require('chalk');

// show course list
router.get('/', function(req, res, next) {
    
	//GET /api/course
    helper.reqLocal('/api/course', 'GET', function(jsonRes) {
        res.render('course/index', {title: 'Mathgen | Courses', data: jsonRes.data});
    });

});

// show problems for specific course
router.get('/:course', function(req, res, next) {
    
    //GET /api/problem
    helper.reqLocal('/api/problem?course='+req.params.course, 'GET', function(jsonRes) {
        res.render('problem/index', {title: 'Mathgen | Problems', data: jsonRes.data});
    });

});

module.exports = router;
