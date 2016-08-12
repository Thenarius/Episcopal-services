var services = [];
var expandWeek = {
	"Sun": "Sunday",
	"Mon": "Monday",
	"Tue": "Tuesday",
	"Wed": "Wednesday",
	"Thu": "Thursday",
	"Fri": "Friday",
	"Sat": "Saturday"
};

function timeConvert(time) {
	time = time.replace(/:/g, '');
	var meridian = $('#time button .active').text();
	console.log(meridian);
	return time;
}

// save new service
$('#modalSave').click(function(e) {
	var type = $('#eventDrop .selection').val();
	
	var newObj = {};
	newObj[type] = {};

	$('#week .active').each(function(element) {
		var day = expandWeek[$(this).text()];
		newObj[type][day] = newObj[type][day] || [];
		newObj[type][day].push( {
			"language": $('#language').val().replace(/\s/g, '').split(','),
			"time": timeConvert($('#hour').val() + $('#minute').val()),
			"tags": []
		});
	});

	services.push(newObj);
	console.log(newObj);

	$('#serviceContainer').append(
		'<div class="service">' + JSON.stringify(newObj) + 
		'<button type="button" class="btn btn-default">&#9998;</button>' +
		'<button type="button" class="btn btn-danger">&times;</button>' + 
		'</div>'
	);
});

// submit request
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

// tags toggle
$('#tags button').click(function() {
	$(this).toggleClass('active');
})