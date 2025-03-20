const logger = require("../utils/Logger.js");
const db = require("../models");
const DBQuery = {};

async function doer_findByServiceDayTimeDBCall(rservices, rday, rtime) {
	logger.info("DBQuery doer_findByServiceDayTimeDBCall services = " + rservices + " day = " + rday + " time = " + rtime, );

	var doers_found = {};
	try {
		doers_found = await db.sequelize.query(
		`SELECT  "doer"."doer_id",
                             "doer"."name",
                             "doer"."phone_number",
                             "doer"."location",
                             "doer"."services",
                             "doer"."minimum_charges",
                             "doer"."img_url"

                             FROM "doers" AS "doer"
                             INNER JOIN
                             "availability_slots" ON "doer"."doer_id" = "availability_slots"."doer_id"
                             AND
                             "doer"."services" ILIKE :svcs
                             AND
                             "availability_slots"."day" = :sday
                             AND
                             "availability_slots"."start_time" < :stime
                             AND
                             "availability_slots"."end_time" > :stime`,
			{
				replacements: { svcs: rservices, sday: rday, stime: rtime },
			}
		);

		for (let i = 0; i < doers_found[0].length; i++) {
			var doer_slots = {};
			logger.trace("FindBy Service, Day, Time Call FOUND DOERS >>>>>");
					logger.trace("doer-controller findByServicesAndDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));

			doer_slots = await db.availability_slots.findAll({
				where: {
					doer_id: doers_found[0][i].doer_id,
				},
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			});
				logger.trace("doer-controller findByServicesAndDayDBCall -- availability " + JSON.stringify(doer_slots));
			doers_found[0][i].availability = doer_slots;
			logger.trace("DBQuery-controller doer_findByServiceDayTimeDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));
		}
	} catch (err) {
		logger.error("DBQuery-controller doer_findByServiceDayTimeDBCall -- services is " + rservices + " error is " + err.message);
		return null;
	}

	logger.info("DBQuery-controller doer_findByServiceDayTimeDBCall -- SUCCESS returning SIZE: " + doers_found[0].length);
	return doers_found[0];
}

async function doer_findByServiceDayDBCall(rservices, rday) {
	logger.info("DBQuery doer_findByServiceDayDBCall services = " + rservices + " day = " + rday  );

	var doers_found = {};
	try {
		doers_found = await db.sequelize.query(
		`SELECT  "doer"."doer_id",
                             "doer"."name",
                             "doer"."phone_number",
                             "doer"."location",
                             "doer"."services",
                             "doer"."minimum_charges",
                             "doer"."img_url"

                             FROM "doers" AS "doer"
                             INNER JOIN
                             "availability_slots" ON "doer"."doer_id" = "availability_slots"."doer_id"
                             AND
                             "doer"."services" ILIKE :svcs
                             AND
                             "availability_slots"."day" = :sday`,
			{
				replacements: { svcs: rservices, sday: rday },
			}
		);

		for (let i = 0; i < doers_found[0].length; i++) {
			var doer_slots = {};
			console.log("FOUND DOERS >>>>>");
			//		logger.info("doer-controller findByServicesAndDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));

			doer_slots = await db.availability_slots.findAll({
				where: {
					doer_id: doers_found[0][i].doer_id,
				},
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			});
			//	logger.info("doer-controller findByServicesAndDayDBCall -- availability " + JSON.stringify(doer_slots));
			doers_found[0][i].availability = doer_slots;
			logger.info("dbquery-controller doer_findByServiceDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));
		}
	} catch (err) {
		logger.error("dbquery-controller doer_findByServiceDayDBCall -- services is " + rservices + " error is " + err.message);
		return null;
	}

	logger.info("dbquery-controller doer_findByServiceDayDBCall -- SUCCESS returning SIZE: " + doers_found[0].length);
	return doers_found[0];
}

module.exports = {
    doer_findByServiceDayTimeDBCall,
    doer_findByServiceDayDBCall
};




