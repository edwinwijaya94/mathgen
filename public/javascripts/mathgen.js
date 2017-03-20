$(document).ready(function() {
	
	//set current active page on navbar
	var pathname = window.location.pathname;
	var patternHome = new RegExp('^/$');
	var patternProblem = new RegExp('^/problem');
	if(patternHome.test(pathname))
		$('#mathgen-nav > #home').addClass('active');
	else if(patternProblem.test(pathname))
		$('#mathgen-nav > #problem').addClass('active');

    //event listener
    $("#answer-form").on('submit', submitAnswer);
});

function showAlert(message,alerttype) {

    $('#alert-area').append('<div id="alertdiv" class="alert alert-' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');
}

function createProblem() {
	var data = {};
	data.problemSet = $('#problem-form > #problem-set').val();
	data.name = $('#problem-form > #name').val();
	data.template = $('#problem-form > #template').val();
	data.seedValue = $('#problem-form > #seed-value').val();
	data.formula = $('#problem-form > #formula').val();

	$.ajax(
    {
        url : '/api/problem',
        type: 'POST',
        data : JSON.stringify(data),
        headers: {
	        'Content-Type':'application/json'
	    },
        success:function(response, textStatus, jqXHR) 
        {
            if(response.status == "success") {
            	window.location.replace("/");
            }
        }
    });
}

function submitAnswer(e) {

    e.preventDefault();
	var data = {};
	data.problemId = $('#problem-id').text();
	data.answer = $('#answer-form > #answer').val();
	data.values = $('#problem-content > #values').text();
	console.log("submit answer");
	$.ajax(
    {
        url : '/api/solver/check',
        type: 'POST',
        data : JSON.stringify(data),
        headers: {
	        'Content-Type':'application/json'
	    },
        success:function(response, textStatus, jqXHR) 
        {
            if(response.status == "success") {
            	if(response.data.result == "true")
            		showAlert(response.data.message, 'info');
            	else 
            		showAlert(response.data.message, 'danger');
            }
        }
    });	
};