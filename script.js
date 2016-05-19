$(document).ready(function() {
	$.getJSON('/dioceses/olympia.json', function(data) {
		var obj = JSON.parse(data);
		var tr_class;
		for (var i in obj.parishes) {
			element = obj.parishes[i];
			if (i % 2 == 0) {
				tr_class = "dark";
			}
			else {
				tr_class = "light";
			}
			var append = '<tr class="' + tr_class + '">';
			append += '<td><a href="'+ element.website + '">' + element.name + '</a></td>';
			append += '<td>' + element.city + '</td>';
			append += '<td>' + element.address + '</td>';
			append += '<td>' + element.zip + '</td>';
			append += '<td>' + element.phone + '</td>';

			// get sunday times
			var sunday_obj = element.events.mass.Sunday ;
			var sunday_times = [];
			for (var x in sunday_obj) {
				sunday_times.push(sunday_obj[x].time);
			}

			append += '<td>' + sunday_times.join(', ') + '</td></tr>'
			$('table').append(append);
		}
	});
})