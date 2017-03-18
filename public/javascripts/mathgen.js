$(document).ready(function() {
	
	//set current active page on navbar
	var pathname = window.location.pathname;
	var patternHome = new RegExp('^/$');
	var patternProblem = new RegExp('^/problem');
	if(patternHome.test(pathname))
		$('#mathgen-nav > #home').addClass('active');
	else if(patternProblem.test(pathname))
		$('#mathgen-nav > #problem').addClass('active');

});

function createProblem() {
	var data = {};
	data.problemSet = $('#problem-form > #problem-set').val();
	data.name = $('#problem-form > #name').val();
	data.template = $('#problem-form > #template').val();
	data.seedValue = $('#problem-form > #seed-value').val();
	data.formula = $('#problem-form > #formula').val();

	$.ajax(
    {
        url : "/api/problem",
        type: "POST",
        data : JSON.stringify(data),
        headers: {
	        'Content-Type':'application/json'
	    },
        success:function(data, textStatus, jqXHR) 
        {
            if(data.status == "success") {
            	// window.location.replace("/");
            }
        }
    });
}