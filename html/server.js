var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var https = require('https');

var app = express();
app.use(bodyparser.urlencoded());

app.get('*', function(req, res) {
	console.log("GET at " + req.path)
	res.sendFile(__dirname + '/' + req.path);
});

// Once the user has sent their location, we're going to:
// 1. Get the latitude & longitude of their location from Google
// 2. Compare this against our database of parishes & get the n closest ones
// 3. Use those parishes to render our results page
// 4. Serve the results page to the user.
app.post('/search', function(req, res) {
	console.log("POST to /search: " + req.body.location);

	// Storing Google Maps API key in a separate file for security purposes.
	fs.readFile('.key', 'utf8', function(err, data) {
		if (err) throw err;

		// Make a request to the geocode API to get the latitude & longitude of the user's entered location
		var key = data;
		var location = req.body.location;
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + "&key=" + key;
		
		https.get(url, function(response_stream) {
			var json_out = ""; // read the response into this variable
			
			response_stream.on('data', function(data) {
				json_out += data;
			});

			response_stream.on('end', function(err, data) {
				if (err) throw err;
				console.log("Received full response from Geocode");
				console.log("json_out: " + json_out);
			});
		});
	});
	
	res.sendFile(__dirname + '/' + 'map.html');
});

app.listen(8080, function() {
	console.log("node.js listening on port 8080");
});