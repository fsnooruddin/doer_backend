"use strict";
/**
 * @namespace OTP
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const OTP = db.otps;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");
const otpGenerator = require("otp-generator");

/**
 * Create a OTP.
 * <p>
 * NOTE: OTP is only valid for 5 mins after creation.
 * </p>
 * @param {object} OTP - JSON representing OTP
 * @param {number} OTP.phone_number - Phone number requesting the OTP
 * @example
 * Sample payload:
 * {
 *    phone_number: "3032221234"
 *  }
 * @memberof OTP
 */
async function create(req, res) {
	console.log("req body in create OTP: ");
	console.log(req.body);

	// Generate a 6-digit OTP
	const otp = otpGenerator.generate(6, { digits: true, alphabets: true, upperCase: false, specialChars: false });

	const otp_row = {
		phone_number: req.body.phone_number,
		otp: otp,
	};

	console.log("new OTP in create OTP: ");
	console.log(otp_row);

	try {
		// Save OTP in the database
		var new_otp = OTP.create(otp_row);
		logger.info("Success creating OTP with OTP data =" + req.body);
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error creating OTP with OTP data =" + req.body + " error: " + err.OTP);
		res.status(500).send({
			OTP: err.OTP || "Some error occurred while creating the OTP.",
		});
		return;
	}
}

/**
 * Validate a OTP
 * @param {object} OTP - JSON representing OTP
 * @param {number} OTP.phone_number - Phone number requesting the OTP
 * @param {string} OTP.otp - OTP to validate
 * @example
 * Sample payload:
 * {
 *    phone_number: "3032221234",
 *    otp: "de8jw2"
 *  }
 * @return {string} error string - true/false depending on if validation fails
 * @memberof OTP
 */
async function validate(req, res) {
	logger.info(req.body);
	const phone_number = req.body.phone_number;
	const otp = req.body.otp;
	if (phone_number == null) {
		logger.error("Error retrieving OTPs by ID, OTP Id is missing");
		res.status(500).send({
			OTP: "Error retrieving OTPs by phone_number, OTP Id is missing",
		});

		return;
	}

	OTP.findOne({
		where: {
			phone_number: phone_number,
		},
		attributes: {
			exclude: ["updatedAt"],
		},
	})
		.then((data) => {
			logger.info("OTP-controller findById -- OTP phone_number is " + phone_number + " returning " + JSON.stringify(data));

			if (data == null) {
				res.status(500).send("message: OTP not found for phone_number is " + phone_number);
				return;
			}

			console.log(new Date());
			console.log(new Date(data.createdAt));
			let diff = new Date() - new Date(data.createdAt);
			console.log("date diff = " + diff / 1000);

			if (data.diff > 300) {
				logger.info("OTP-controller OTP expired");
				data.destroy();
				res.status(200).send("message: OTP expired");
				return;
			}

			if (data.otp === otp) {
				logger.info("OTP-controller OTP matches");
				data.destroy();
				res.status(200).send("message: OTP Matches");
				return;
			} else {
				logger.info("OTP-controller OTP NO matches");
				res.status(200).send("message: OTP Miss Match");
				return;
			}
		})
		.catch((err) => {
			logger.error("Error validating OTP with OTP phone_number=" + phone_number + " error: " + err.message);
			res.status(500).send({
				OTP: "message: Error validating OTP with phone_number=" + phone_number + " error: " + err.message,
			});
		});
}

module.exports = {
	create,
	validate,
};
