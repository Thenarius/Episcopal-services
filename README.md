# Episcopal Service Times #
### ... aka "Better Know A Diocese" ###
This app endeavors to provide accurate, up-to-date information on services in the Episcopal Church.

I am currently implementing data for churches in the Episcopal Diocese of Olympia (Western Washington).

## Data format ##
Parish information is stored as an object. An example:

		{
			"name": "St. Paul's Episcopal Church",
			"city": "Bremerton",
			"address": "700 Callahan Dr",
			"zip": "98130",
			"phone": "3603770106",
			"website": "http://www.stpaulsbremerton.org/",
			"events": {
				"mass": {
					"Sunday": [
						{
							"language": "English",
							"time": "8:00", 
							"tags": ["spoken"]
						},
						{
							"language": "English",
							"time": "10:15",
							"tags": ["choral"]
						}],
					"Thursday": [
						{
							"language": "English",
							"time": "10:00",
							"tags": ["healing"]
						}]
				},
				"daily_office": {},
				"prayer_service": {},
				"bible_study": {
					"Wednesday": "10:00"
				}
			},
			"flag_for_outreach": "FALSE" 
		},

Contact data (all listings before "events" parameter) should be filled in for all parishes. However, not all parishes will have all types of services on all days.

For services, language should be specified explicitly. Assume English if a parish website does not list it. Languages should be listed in their native-written form (e.g. "español"). 

The "flag for outreach" parameter should be true **only** for parishes that have defunct websites or otherwise out-of-date/missing information (e.g., if any contact information is missing). 

## TODO ##
* Figure out a solution for the map page -- when we do locations we're going to be selecting all parishes within a certain distance...
* Switch back to Bootstrap for tabs due to unsettling behavior from jQuery UI.
* Define & compile custom Bootstrap style.
* Continue implementing churches in the diocese of Olympia. 
* Revamp the way services that only occur e.g. every other week are handled.
* Update the example church in this file.
* Have web app display Olympia entries somehow.
* Flesh-out map page.