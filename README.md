# Episcopal Service Times #
### ... aka "Better Know A Diocese" ###
This app endeavors to provide accurate, up-to-date information on services in the Episcopal Church.

I am currently implementing data for churches in the Episcopal Diocese of Olympia (Western Washington).

## Data format ##
Parish information is stored as an object. An example:

		{
			"name": "St. Mark's Cathedral",
			"address": "1245 10th Ave E",
			"city": "Seattle",
			"state": "WA",
			"zip": "98102",
			"diocese": "Olympia",
			"phone": "2063230300",
			"website": "http://www.saintmarks.org/",
			"events": {
				"eucharist": {
					"Sunday": [
						{
							"language": "English",
							"time": "8:00", 
							"tags": []
						},
						{
							"language": "English",
							"time": "9:00",
							"tags": []
						},
						{
							"language": "English",
							"time": "11:00",
							"tags": []
						}.
						{
							"language": "English",
							"time": "19:00",
							"tags": ["contemplative"]
						}],
					"Wednesday": [
						{
							"language": "English",
							"time": "12:00",
							"tags": []
						}],
					"Thursday": [
						{
							"language": "English",
							"time": "07:00",
							"tags": []
						}]
				},
				"daily_office": {
						"Sunday": {
							"Evensong": "16:30",
							"Compline": "21:30"
						},
						"Monday": {
							"Evening Prayer": "18:30"
						},
						"Tuesday": {
							"Evening Prayer": "18:30"
						},
						"Wednesday": {
							"Evening Prayer": "18:30"
						},
						"Thursday": {
							"Evening Prayer": "18:30"
						},
						"Friday": {
							"Evening Prayer": "18:30"
						}
					},
				"prayer_service": {
					"Monday": {
						"name": "Centering Prayer",
						"time": "19:15",
						"tags": ["contemplative"]
					}
				},
				"bible_study": {}
			},
			"flag_for_outreach": "FALSE" 
		},

Contact data (all listings before "events" parameter) should be filled in for all parishes. However, not all parishes will have all types of services on all days.

For services, language should be specified explicitly. Assume English if a parish website does not list it. Languages should be listed in their native-written form (e.g. "español"). 

The "flag for outreach" parameter should be true **only** for parishes that have defunct websites or otherwise out-of-date/missing information (e.g., if any contact information is missing). 

## TODO ##
* Get & store latitude & longitude data for existing churches.
* Continue implementing churches in the diocese of Olympia. (50/101)
* Deal with churches with tags location-fix and repeat-fix.