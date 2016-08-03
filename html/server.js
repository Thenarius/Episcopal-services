// -- Includes --
var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var https = require('https');
var ejs = require('ejs');
var Mongo = require('mongodb');

// -- Config -- 
var app = express();
app.use(bodyparser.urlencoded());

app.set('views', __dirname + '/views');

// -- open db connection -- 
var mongoClient = Mongo.MongoClient;
var collection;
mongoClient.connect('mongodb://localhost:27017/db', function(err, db) {
	if (err) throw err;
	console.log("Successfully connected to mongoDB");
	collection = db.collection('documents');
});

// -- Routes -- 
app.get('*', function(req, res) {
	console.log("GET at " + req.path)
	res.sendFile(__dirname + '/' + req.path);
});

app.post('/search', function(req, res) {
	console.log("POST to /search: " + req.body.location);

	// Storing Google Maps API key in a separate file for security purposes
	fs.readFile('.key', 'utf8', function(err, data) {
		if (err) throw err;

		// Make a request to the geocode API to get the latitude & longitude of the user's entered location
		var key = data;
		var location = req.body.location;
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + "&key=" + key;
		
		function getNearestParishes(geocode_response, callback) {
			var latitude = geocode_response.results[0].geometry.location.lat;
			var longitude = geocode_response.results[0].geometry.location.lng;
			var response = {latitude: latitude, longitude: longitude}; // for rendering the page

			function render(parish_array) {
				res.render('map.ejs', {
					geometry: response,
					parishes: parish_array
				});
			}

			// -- Haversine -- 
			var parish_distances = [];

			function distanceCalc(search_lat, search_lng, parish, callback) {
				function radians(degree) {
					return degree / 180 * Math.PI;
				}

				var parish_lat = Number(parish.latitude);
				var parish_lng = Number(parish.longitude);
						
				var dLat = radians(search_lat - parish_lat); // distance between two latitudes, in radians
				var dLng = radians(search_lng - parish_lng); // distance between two longitudes, in radians

				// haversine formula
				var param_a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
							  Math.cos(radians(search_lat)) * Math.cos(radians(parish_lat)) *
							  Math.sin(dLng/2) * Math.sin(dLng/2);
				
				var param_c = 2 * Math.asin(Math.sqrt(param_a));
				var distance = 3959 * param_c; 

				var MAX_DIST = 25; // TODO - change this for interactivity
				if (distance <= MAX_DIST) {
					return [parish._id, distance];
				}

				else {
					return false;
				}
			}

			// -- DB operations -- 

			function parishLookup() {
				parish_list = parish_list.sort(function(a, b) {
					return a[1] - b[1];
				});
				var id_list = [];
				parish_list.forEach(function(parish) {
					id_list.push(parish[0]);
				})
			
				var parishes = [];
				var cursor = collection.find({ _id: { $in: id_list }});
				cursor.each(function(err, doc) {
					console.log("Each!");
					if (doc) {
						parishes.push(doc);
					}
					else {
						parishes.forEach(function(parish) {
							parish_list.forEach(function(id) {
								if (String(id[0]) == String(parish._id)) {
									id[0] = parish;
								};
							});
						});
						parish_list = parish_list.sort(function(a, b) {
							return a[1] - b[1];
						});

						console.log(parish_list);
						var return_array = [];
						parish_list.forEach(function(item) {
							return_array.push(item[0]);
						});

						render(return_array);
					}
				});
			}

			var cursor = collection.find( { $where: function() { return (typeof(this.latitude) != 'undefined'); } });
			var parish_list = [];
			cursor.each(function(err, item) {
				if (item) {
					var temp = distanceCalc(latitude, longitude, item);
					if (temp) {
						parish_list.push(temp);
					}
				}
				else {
					parishLookup();
				}
			});


		}

		https.get(url, function(response_stream) {
			var json_out = ""; // read the response into this variable
			
			response_stream.on('data', function(data) {
				json_out += data;
			});

			response_stream.on('end', function(err, data) {
				if (err) throw err;

				console.log("Successfully received full response from Geocode");
				getNearestParishes(JSON.parse(json_out), function(data) {
					res.render('map.ejs', data);	
				});
			});
		});
	});
});

app.listen(8080, function() {
	console.log("node.js listening on port 8080");
});