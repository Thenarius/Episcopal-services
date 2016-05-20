$(document).ready(function() {
	$("#submit").click(function() {
		console.log("Clicked submit button");

		$.post('/search', function(data) {
			$('body').html(data);
			console.log("POSTed to /search")
		});
	});	

	$("#dioceseLink").click(function() {
		console.log("Clicked Diocese Select link");

		$.get('/diocese/index.html', function(data){
			$('#dioceses').html(data);
			$('#dioceses').toggle();
		});
	});
});