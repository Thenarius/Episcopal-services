var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var https = require('https');
var ejs = require('ejs');

var app = express();
app.use(bodyparser.urlencoded());


// TEMP DEBUG etc
app.set('views', __dirname + '/views');


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
				json_out = JSON.parse(json_out);
				console.log("Received full response from Geocode");
				var latitude = json_out.results[0].geometry.location.lat;
				var longitude = json_out.results[0].geometry.location.lng;

				// Once we have the location data, we need to prepare our response to the user
				// We are going to give them the map page, with a map centered on the 
				// latitude & longitude they gave us.
				// The parish result list is going to be a list of all parishes 
				// within a certain distance of them, ordered by closest to nearest. 

				// So, in order, the actions we need to take are:
				// 1. Look up the location the user searches & pass it to Geocode
				// 2. Take the latitude & longitude from the geocode response and:
				//   a. Look up the nearest parishes to that location in our database.
				//   b. Format a JSON file with those parishes for rendering in the map.html.
				//   c. Center the map on the lat & lng.
				//   d. Plot parishes on the map.
				// 3. Render the map.html with all this data and respond to the user with it. 
				var response = { 'lat': latitude, 'lng': longitude };
				res.render('map.ejs', { geometry: response });
			});
		});
	});
});

app.listen(8080, function() {
	console.log("node.js listening on port 8080");
});