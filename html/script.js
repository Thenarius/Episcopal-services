$(document).ready(function() {
	$("#tabs a").click(function(event) {
		event.preventDefault();
		$(this).tab('show');
		console.log(this);
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