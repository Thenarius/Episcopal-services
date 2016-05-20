$(document).ready(function() {
	$("#submit").click(function() {
		console.log("Clicked submit button");

		$.post('/search', function(data) {
			$('body').html(data);
			console.log("POSTed to /search")
		});
	});	
});