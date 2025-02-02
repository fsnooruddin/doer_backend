const db = require("../models");
const logger = require("../utils/Logger.js");

module.exports = {
	escapeJSONString,
	getTimeFromAvailability,
	getDayFromAvailability,
	processTimeMatch,
	filterByTime,
	filterByDistance,
	getRateFromAvailabilitySlot,
};

function escapeJSONString(server_return_string) {
	var data_str = JSON.stringify(server_return_string);

	// Preserve newlines, etc. - use valid JSON
	data_str = data_str
		.replace(/\\n/g, "\\n")
		.replace(/\\'/g, "\\'")
		.replace(/\\"/g, '\\"')
		.replace(/\\&/g, "\\&")
		.replace(/\\r/g, "\\r")
		.replace(/\\t/g, "\\t")
		.replace(/\\b/g, "\\b")
		.replace(/\\f/g, "\\f");
	// Remove non-printable and other non-valid JSON characters
	data_str = data_str.replace(/[\u0000-\u001F]+/g, "");

	return JSON.parse(data_str);
}

function filterByDistance(timeRequested, doers) {
	const options = {
		method: "GET",
		hostname: "distance-calculator8.p.rapidapi.com",
		port: null,
		path: "/calc?startLatitude=-26.311960&startLongitude=-48.880964&endLatitude=-26.313662&endLongitude=-48.881103",
		headers: {
			"x-rapidapi-key": "b00a84708dmsh4a783e20708dbacp190650jsnae7c641c67d9",
			"x-rapidapi-host": "distance-calculator8.p.rapidapi.com",
		},
	};

	const req = http.request(options, function (res) {
		const chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			const body = Buffer.concat(chunks);
			console.log(body.toString());
		});
	});

	req.end();
}

async function filterByTime(dayRequested, timeRequested, doers) {
	logger.trace("data in filterByTime= " + dayRequested + "  " + timeRequested);

try {
	var ret_doers = [];
	for (let d_entry of doers) {
		logger.trace("Processing Doer Availability" + "     " + JSON.stringify(d_entry));

		console.log(typeof d_entry.availability);
		console.log(JSON.parse(d_entry.availability));

		var objs = JSON.parse(d_entry.availability);
		//console.log ("availability = " + objs);
		//console.log ("one slot = " + JSON.stringify(objs.slots[0]));
		//console.log ("slots = " + JSON.stringify(JSON.parse(JSON.stringify(objs.slots[0]))));
		//console.log(JSON.parse (objs));
		var retVal = processTimeMatch(dayRequested, timeRequested, JSON.parse(JSON.stringify(objs.slots)));
		if (retVal != -1) {
			ret_doers.push(d_entry);
		}
	}
	logger.trace('returning filterByTime size of return = ' + ret_doers.length)
	return ret_doers;
	} catch (error) {
	    logger.error('filterByTime caught error  = ' + error.message);
	    return [];
	}
}

function getDayFromAvailability(availability) {
	const retArray = availability.split(",");
	if (retArray[0] === undefined) {
		logger.warn("Malformed availability sent to getDayFromAvailability, avail = " + availability);
		return null;
	}
	return retArray[0];
}

function getTimeFromAvailability(availability) {
	const retArray = availability.split(",");
	if (retArray[1] === undefined) {
		logger.warn("Malformed availability sent to getTimeFromAvailability, avail = " + availability);
		return null;
	} else {
		return retArray[1];
	}
}

function timesMatch(reqSlotTime, slotTime) {
	let retArray = slotTime.split("-");
	let doerStartTime = parseInt(retArray[0]);
	let doerCloseTime = parseInt(retArray[1]);
	logger.trace("doer slot start time = " + doerStartTime + "  doer slot end time = " + doerCloseTime);

	retArray = reqSlotTime.split("-");
	let reqStartTime = parseInt(retArray[0]);
	let reqCloseTime = parseInt(retArray[1]);
	logger.trace("job request start time = " + reqStartTime + "  job request end time = " + reqCloseTime);

	if (reqStartTime >= doerStartTime) {
		if (reqCloseTime <= doerCloseTime) {
			logger.trace(reqSlotTime + "request slot matches doer availability slot " + slotTime);
			return true;
		}
	}
	return false;
}

function processTimeMatch(reqSlotDay, reqSlotTime, avail) {
	for (let i = 0; i < avail.length; i++) {
		let a_entry = avail[i];
		logger.trace("job request time slot: " + reqSlotDay + " , " + reqSlotTime + " matches " + JSON.stringify(a_entry));
		var slotDay = a_entry.slot.day;
		logger.trace("slot day is = " + slotDay);
		var slotTime = a_entry.slot.time;
		logger.trace("slot time is = " + slotTime);
		let dayMatch = false;
		let timeMatch = false;

		if (slotDay.indexOf(reqSlotDay) !== -1) {
			dayMatch = true;
		}

		timeMatch = timesMatch(reqSlotTime, slotTime);

		if (dayMatch === true && timeMatch === true) {
			logger.info("job request time slot: " + reqSlotDay + " , " + reqSlotTime + " matches " + JSON.stringify(a_entry));
			return i;
		}
	}
	logger.trace("job request time slot: " + reqSlotDay + " , " + reqSlotTime + " doesn't matche " + JSON.stringify(a_entry));
	return -1;
}

function getRateFromAvailabilitySlot(reqSlotDay, reqSlotTime, avail) {
	let idx = processTimeMatch(reqSlotDay, reqSlotTime, avail);
	if (idx == -1) {
		logger.warn("getRateFromAvailabilitySlot -- reqSlot: " + reqSlotDay + " , " + reqSlotTime + " found no matches, return -1 for rate");
		return -1;
	}

	let rate = avail[idx].rate;
	logger.warn("getRateFromAvailabilitySlot -- reqSlot: " + reqSlotDay + " , " + reqSlotTime + " returning rate = " + rate);
	return rate;
}
