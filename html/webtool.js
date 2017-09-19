var express = require('express');
var https = require('https');
var bodyparser = require('body-parser');
var Mongo = require('mongodb');

var app = express();
app.use(bodyparser.urlencoded());

app.get('*', function(req, res) {
	console.log("GET at " + req.path)
	res.sendFile(__dirname + '/' + req.path);
});

app.post('/webtool/add', function(req, res) {
	console.log("POST at " + req.path);
	console.log(req.body);

	// geocode lookup
	var url = "https://maps.googleapis.com/maps/api/geocode/json?";
	url += "address=" + req.body.address + ' ' + req.body.city + ', ' + req.body.state;
	url += "&key=AIzaSyAKMWJ5CWwHvCmHP8qY-4Wsadulsqx0BRg"; // todo security take out etc.
	https.get(url, function(response_stream) {
		var json_out = ""; // read the response into this variable
			
		response_stream.on('data', function(data) {
			json_out += data;
		});

		response_stream.on('end', function(err, data) {
			if (err)  {
				throw err;
				res.status(500).end();
			}
			console.log("Successfully received full response from Geocode");

			var results = JSON.parse(json_out);
			if (results.results[0]) {
				var latitude = results.results[0].geometry.location.lat;
				var longitude = results.results[0].geometry.location.lng;
				console.log(latitude, longitude);


				// add to db - todo
				var mongoClient = Mongo.MongoClient;
				mongoClient.connect('mongodb://localhost:27017/experimental', function(err, db) {
					if (err) { 
						throw err;
						res.status(500).end();
					}
					console.log("Successfully connected to mongoDB");
					var collection = db.collection("parishes");
					var flag;
					if (req.body.flag) {
						flag = true;
					} else { flag = false; }

					collection.insert({
						'name': req.body.parish,
						'address': req.body.address,
						'city': req.body.city,
						'state': req.body.state,
						'zip': req.body.zip,
						'diocese': req.body.diocese,
						'latitude': latitude,
						'longitude': longitude,
						'phone': req.body.phone,
						'website': req.body.website,
						'events': [],
						'last_updated': new Date().toISOString().split('T')[0],
						'flag_for_outreach': flag
					});

					db.close();
				});
				res.status(200).end();
			} else { // let's try to avoid crashing on empty address
				console.log("Encountered error reading results data");
				console.log("Results: " + JSON.stringify(results));
				res.status(500).end();
			}
		});
	});


});

app.listen('8080', function() {
	console.log('node.js listening on port 8080...');
});