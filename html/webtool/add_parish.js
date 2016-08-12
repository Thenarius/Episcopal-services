var services = [];

$('#modalSave').click(function(e) {
	console.log("Fire");
	var tempObj = {
		'type': $('#eventDrop').val(),
		'languages': $('#language').val().replace(/\s/g, '').split(','),
		'days': [],
		'time': $('#hour').val() + ':' + $('#minute').val(),
		'tags': []
	};
	services.push(tempObj);
	console.log(tempObj);

	$('#serviceContainer').append(
		'<div class="service">' + JSON.stringify(tempObj) + 
		'<button type="button" class="btn btn-default">&#9998;</button>' +
		'<button type="button" class="btn btn-danger">&times;</button>' + 
		'</div>'
	);
});

$('#parishForm').on('submit', function(e) {
	e.preventDefault();
	console.log(e.target);

	$.post('/webtool/add', {
		parish: $('#parish').val(),
		address: $('#address').val(),
		city: $('#city').val(),
		state: $('#state').val(),
		zip: $('#zip').val(),
		phone: $('#phone').val(),
		website: $('#website').val(),
		flag: $('#checkbox:checked').val()
	}, function(data, status) {
		console.log(status);
		if (status == "success") {
			// update page with "Successfully added parish to DB"
			$('#success').show();
		}
		else {
			$('#error').show();
		}
	}).fail(function() {
		$('#error').show();
	});

	console.log("Form submitted!");
});

// dropdown handler

$('.dropdown-menu li a').click(function() {
	$(this).parents('.dropdown').find('.selection').text($(this).text());
	$(this).parents('.dropdown').find('.selection').append(' <span class="caret"></span>');
	$(this).parents('.dropdown').find('.selection').val($(this).text());

	/* if ($(this).text() == 'Daily Office') {
		// show Daily Office selector; hide it otherwise
	}*/
});

// AM/PM toggle
$('#time button').click(function() {
	$('#time .active').not(this).removeClass('active');
	$(this).toggleClass('active');
})

// days of the week buttons
$('.weekday').click(function() {
	$(this).toggleClass('active');
})