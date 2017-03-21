var express = require('express');
var router = express.Router();
var http = require('http');
var chalk = require('chalk');

// create new problem
router.get('/create', function(req, res, next) {
  	res.render('problem/form', {title: 'Mathgen | Create Problem', data: {} });
});

// show problem list
router.get('/view', function(req, res, next) {
    
	//GET /api/problem
    var options = {
        host : 'localhost',
        port : process.env.PORT || 3000,
        path : '/api/problem',
        method : 'GET',
        headers: {'Content-Type':'application/json'}
    };
    var call = http.request(options, function(response) {
    	response.setEncoding('utf8');
    	var str ="";
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function(d) {
            var jsonRes = JSON.parse(str);
            if(jsonRes.status == "success")
                res.render('problem/index', {title: 'Mathgen | Problems', data: jsonRes.data});
            else
                res.render('error/404');
        });
    });
    call.end();
    call.on('error', function(err) {
        console.log(chalk.red(err));
    });
});

// edit problem
router.get('/edit', function(req, res, next) {
    var problemId = req.query.problem_id;

    //GET /api/problem
    var options = {
        host : 'localhost',
        port : process.env.PORT || 3000,
        path : '/api/problem?problem_id='+problemId,
        method : 'GET',
        headers: {'Content-Type':'application/json'}
    };
    var call = http.request(options, function(response) {
        response.setEncoding('utf8');
        var str ="";
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function(d) {
            var jsonRes = JSON.parse(str);
            res.render('problem/form', {title: 'Mathgen | Edit Problem', data: jsonRes.data[0]});
        });
    });
    call.end();
    call.on('error', function(err) {
        console.log(chalk.red(err));
    });
});

// show generated problem 
router.get('/generate', function(req, res, next) {

    var problemId = req.query.problem_id;

    //GET /api/problem
    var options = {
        host : 'localhost',
        port : process.env.PORT || 3000,
        path : '/api/generator/generate?problem_id='+problemId,
        method : 'GET',
        headers: {'Content-Type':'application/json'}
    };
    var call = http.request(options, function(response) {
        response.setEncoding('utf8');
        var str ="";
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function(d) {
            var jsonRes = JSON.parse(str);
            res.render('problem/generated', {title: 'Mathgen | Problems', data: jsonRes.data});
        });
    });
    call.end();
    call.on('error', function(err) {
        console.log(chalk.red(err));
    });
});

module.exports = router;
