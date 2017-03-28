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
    $("#problem-form").unbind('submit').bind('submit', submitProblem);
    $("#answer-form").unbind('submit').bind('submit', submitAnswer);
    $(".problem-delete").unbind('click').bind('click', deleteProblem);
});

function showAlert(message,alerttype) {

    $('#alert-area').append('<div id="alertdiv" class="alert alert-' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');
}

function submitProblem(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

	var data = {};
	data.course = $('#problem-form > #course option:selected').attr('data-course-id');
	data.topic = $('#problem-form > #topic').val();
	data.template = $('#problem-form > #template').val();
	data.seedValue = $('#problem-form > #seed-value').val();
	data.formula = $('#problem-form > #formula').val();

    //set request method
    var type;
    var pathname = window.location.pathname;
    var patternCreate = new RegExp('/problem/create$');
    var patternEdit = new RegExp('/problem/edit$');
    if(patternCreate.test(pathname))
        type = 'POST';
    else if(patternEdit.test(pathname)) {
        type = 'PATCH';
        data.problemId = $('#problem-form > #problem-id').text();
    }

	$.ajax(
    {
        url : '/api/problem',
        type: type,
        data : JSON.stringify(data),
        headers: {
	        'Content-Type':'application/json'
	    },
        success:function(response, textStatus, jqXHR) 
        {
            if(response.status == "success") {
            	window.location.replace("/problem/view");
            }
        }
    });
}

function submitAnswer(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    
	var data = {};
	data.problemId = $('#problem-id').text();
	data.answer = $('#answer-form > #answer').val();
	data.values = $('#problem-content > #values').text();

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

function deleteProblem(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    
    var data = {};
    data.problemId = $(this).attr('data-problem-id');
    
    $.ajax(
    {
        url : '/api/problem',
        type: 'DELETE',
        data : JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        },
        success:function(response, textStatus, jqXHR) 
        {
            if(response.status == "success") {
                location.reload();
            }
        }
    }); 
};