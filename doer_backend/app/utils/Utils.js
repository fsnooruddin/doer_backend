const db = require('../models')

module.exports = {
	escapeJSONString,
	getTimeFromAvailability,
	getDayFromAvailability,
	processTimeMatch,
	filterByTime,
	filterByDistance,
	getRateFromAvailabilitySlot
}

function escapeJSONString(server_return_string) {
	var data_str = JSON.stringify(server_return_string)

	// Preserve newlines, etc. - use valid JSON
	data_str = data_str
		.replace(/\\n/g, '\\n')
		.replace(/\\'/g, "\\'")
		.replace(/\\"/g, '\\"')
		.replace(/\\&/g, '\\&')
		.replace(/\\r/g, '\\r')
		.replace(/\\t/g, '\\t')
		.replace(/\\b/g, '\\b')
		.replace(/\\f/g, '\\f')
	// Remove non-printable and other non-valid JSON characters
	data_str = data_str.replace(/[\u0000-\u001F]+/g, '')

	return JSON.parse(data_str)
}

function filterByDistance(timeRequested, doers) {
	const options = {
		method: 'GET',
		hostname: 'distance-calculator8.p.rapidapi.com',
		port: null,
		path: '/calc?startLatitude=-26.311960&startLongitude=-48.880964&endLatitude=-26.313662&endLongitude=-48.881103',
		headers: {
			'x-rapidapi-key':
				'b00a84708dmsh4a783e20708dbacp190650jsnae7c641c67d9',
			'x-rapidapi-host': 'distance-calculator8.p.rapidapi.com',
		},
	}

	const req = http.request(options, function (res) {
		const chunks = []

		res.on('data', function (chunk) {
			chunks.push(chunk)
		})

		res.on('end', function () {
			const body = Buffer.concat(chunks)
			console.log(body.toString())
		})
	})

	req.end()
}

async function filterByTime(dayRequested, timeRequested, doers) {
	console.log('data in filterByTime= ' + dayRequested + '  ' + timeRequested);

	var ret_doers = [];
	for (let d_entry of doers) {
		console.log("Processing Doer Availability" + "     " + JSON.stringify(d_entry));

		console.log(typeof d_entry.availability);
		console.log(JSON.parse(d_entry.availability));

		var objs = JSON.parse(d_entry.availability);
		console.log ("availability = " + objs);
		console.log ("one slot = " + JSON.stringify(objs.slots[0]));
		console.log ("slots = " + JSON.stringify(JSON.parse(JSON.stringify(objs.slots[0]))));
		//console.log(JSON.parse (objs));
		var retVal = processTimeMatch(dayRequested, timeRequested, JSON.parse(JSON.stringify(objs.slots)));
		if (retVal == true) {
			ret_doers.push(d_entry)
		}
	}
	console.log('returning filterByTime size of return = ' + ret_doers.length)
	return ret_doers
}

function getDayFromAvailability(availability) {
	const retArray = availability.split(',')
	return retArray[0]
}

function getTimeFromAvailability(availability) {
	const retArray = availability.split(',')
	if (retArray[1] === undefined) {
		return null
	} else {
		return retArray[1]
	}
}

function timesMatch(reqSlotTime, slotTime) {
	let retArray = slotTime.split('-')
	let doerStartTime = parseInt(retArray[0])
	let doerCloseTime = parseInt(retArray[1])
	//   console.log("doer start time = " + doerStartTime);
	//   console.log("doer end time = " + doerCloseTime);

	retArray = reqSlotTime.split('-')
	let reqStartTime = parseInt(retArray[0])
	let reqCloseTime = parseInt(retArray[1])
	//    console.log("req start time = " + reqStartTime);
	//    console.log("req end time = " + reqCloseTime);

	if (reqStartTime >= doerStartTime) {
		// console.log("start times match...");
		if (reqCloseTime <= doerCloseTime) {
			//	 console.log("close times match...");
			return true
		}
	}
	return false
}

function processTimeMatch(reqSlotDay, reqSlotTime, avail) {
	for (let a_entry of avail) {
	//	  console.log("entry in process time match is = " + JSON.stringify(a_entry));
		var slotDay = a_entry.slot.day
	//	  console.log("slot day is = " + slotDay);
		var slotTime = a_entry.slot.time

		let dayMatch = false
		let timeMatch = false

		if (slotDay.indexOf(reqSlotDay) !== -1) {
			dayMatch = true
		}

		timeMatch = timesMatch(reqSlotTime, slotTime)

		if (dayMatch === true && timeMatch === true) {
			console.log(
				'reqSlot: ' +
					reqSlotDay +
					' , ' +
					reqSlotTime +
					' matches ' +
					JSON.stringify(a_entry)
			)
			return true
		}
	}
	return false
}

function getRateFromAvailabilitySlot(reqSlotDay, reqSlotTime, avail) {
	for (let a_entry of avail) {
		  console.log("entry in process time match is = " + JSON.stringify(a_entry));
		var slotDay = a_entry.slot.day
		  console.log("slot day is = " + slotDay);
		var slotTime = a_entry.slot.time

		let dayMatch = false
		let timeMatch = false

		if (slotDay.indexOf(reqSlotDay) !== -1) {
			dayMatch = true
		}

		timeMatch = timesMatch(reqSlotTime, slotTime)

		if (dayMatch === true && timeMatch === true) {
			console.log(
				'reqSlot: ' +
					reqSlotDay +
					' , ' +
					reqSlotTime +
					' matches ' +
					JSON.stringify(a_entry)
			);
			return a_entry.rate;
		}
	}
	console.log("getRateFromAvailabilitySlot didn't find time match...");
	return -1;
}
