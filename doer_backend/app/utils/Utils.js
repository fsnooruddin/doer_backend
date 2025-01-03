const db = require("../models");

module.exports = {
	escapeJSONString,
	getTimeFromAvailability,
	getDayFromAvailability,
	processTimeMatch
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

function getDayFromAvailability(availability) {
	const retArray = availability.split(":");
	return retArray[0];
}

function getTimeFromAvailability(availability) {
	const retArray = availability.split(":");
	if (retArray[1] === undefined) {
		return null;
	} else {
		return retArray[1];
	}
}


 function timesMatch (reqSlotTime, slotTime) {

        let retArray=slotTime.split("-");
        let doerStartTime = parseInt(retArray[0]);
        let doerCloseTime = parseInt(retArray[1]);
     //   console.log("doer start time = " + doerStartTime);
     //   console.log("doer end time = " + doerCloseTime);

        retArray=reqSlotTime.split("-");
        let reqStartTime = parseInt(retArray[0]);
        let reqCloseTime = parseInt(retArray[1]);
    //    console.log("req start time = " + reqStartTime);
    //    console.log("req end time = " + reqCloseTime);

    	if(reqStartTime >= doerStartTime) {
         // console.log("start times match...");
          if(reqCloseTime <= doerCloseTime) {
         //	 console.log("close times match...");
          	 return true;
          }
        }
        return false;
}

  function processTimeMatch(reqSlotDay, reqSlotTime, avail) {

    for (let a_entry of avail) {
      //  console.log(a_entry);
        var slotDay = a_entry.day;
      //  console.log(day);
        var slotTime = a_entry.time;

        let dayMatch = false;
        let timeMatch = false;

        if(slotDay.indexOf(reqSlotDay) !== -1) {
            dayMatch = true;
        }

        timeMatch = timesMatch(reqSlotTime, slotTime);

        if(dayMatch === true && timeMatch === true) {

         console.log("reqSlot: " + reqSlotDay + " , " + reqSlotTime + " matches " + JSON.stringify(a_entry));
         return true;
        }
    }

     return false;
    }
