$(document).ready(function() {
	$("#submit").click(function() {
		console.log("click");
		$.post('/search', function(data) {
			console.log("search");
			console.log(data);
			$('body').html(data);
			console.log($('body'));
		});
	});	

	$("#dioceseLink").click(function() {
		console.log("Select");

		$.get('/diocese/index.html', function(data){
			console.log("Get");
			$('#dioceses').html(data);
			$('#dioceses').toggle();
		});
	});
});