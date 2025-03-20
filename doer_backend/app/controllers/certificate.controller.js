"use strict";
/**
 * @namespace Certificate
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Certificate = db.certificates;
const DoerCertificateAssociations = db.doer_certificate_associations;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");

/**
 * Create a Certificate
 * @param {object} Certificate - JSON representing Certificate
 * @param {number} Certificate.name - Name of certificate
 * @param {number} Certificate.description - Description of certificate
 * @param {number} Certificate.icon_url - URL of certificate icon
 * @return {string} -- null if success, error string if failure
 * @example
 * {
 *      name: "cool certificate",
 *      description: "Best certificate Ever",
 *      icon_url: "icon.pic"
 *    }
 *
 * @memberof Certificate
 */
async function create(req, res) {
	logger.info("req body in create Certificate: " + JSON.stringify(req.body));

	try {
		// Save Certificate in the database
		let new_certificate = await Certificate.create(req.body);
		logger.info("Success creating Certificate with Certificate data =" + JSON.stringify(req.body));
		res.status(200).send(new_certificate);
		return;
	} catch (err) {
		logger.error("Error creating Certificate with Certificate data =" + req.body + " error: " + err.message);
		res.status(500).send("Some error occurred while creating the Certificate: " + err.message);
		return;
	}
}

/**
 * Get a Certificate
 * @param {number} Certificate.id - Certificate to retreive
 * @return {string} certificate - Certificate if found, error string if error
 * @example
 * Sample payload:
 *  {
 *          certificate_id: 1,
 *          name: 'cool certificate',
 *          description: 'Best certificate Ever',
 *          icon_url: 'icon.pic',
 *          createdAt: '2025-02-21T04:57:48.686Z'
 *        }
 *
 * @memberof Certificate
 */
async function get(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("Error retrieving Certificates by ID, Certificate Id is missing");
		res.status(400).send("Error retrieving Certificates by id, Certificate Id is missing");
		return;
	}

	Certificate.findOne({
		where: {
			certificate_id: id,
		},
		attributes: {
			exclude: ["updatedAt"],
		},
	})
		.then((data) => {
			logger.info("Certificate-controller findById -- Certificate id is " + id + " returning " + JSON.stringify(data));

			if (data == null) {
				res.status(500).send("message: Certificate not found for id is " + id);
				return;
			}

			res.status(200).send(data);
			return;
		})
		.catch((err) => {
			logger.error("Error validating Certificate with Certificate id=" + id + " error: " + err.message);
			res.status(500).send({
				Certificate: "message: Error validating Certificate with id=" + id + " error: " + err.message,
			});
		});
}

/**
 * Assign a Certificate to a Doer
 * @param {number} Certificate.id - Certificate to assign
 * @param {number} Certificate.doerId - Doer to assign certificate to
 * @return {string} certificate - null if success, error string if error
 * @memberof Certificate
 */
async function assignCertificateToDoer(req, res) {
	logger.info("certificate-controller assignCertificateToDoer, body = " + JSON.stringify(req.body));
	// Save Certificate in the database
	DoerCertificateAssociations.create(req.body)
		.then((data) => {
			logger.info("Success associating certificate with doer = " + JSON.stringify(req.body));
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error associating certificate with doer =  =" + JSON.stringify(req.body) + " error: " + err.message);
			res.status(500).send("Some error occurred while associating certificate with doer = : " + err.message);
		});
}

/**
 * Remove a Certificate from a Doer
 * @param {number} Certificate.id - Certificate to remove
 * @param {number} Certificate.doerId - Doer to remove certificate from
 * @return {string} certificate - null if success, error string if error
 * @memberof Certificate
 */
async function removeCertificateFromDoer(req, res) {
	logger.info("certificate-controller removeCertificateFromDoer, body = " + JSON.stringify(req.body));
	// Save Certificate in the database
	DoerCertificateAssociations.delete(req.body)
		.then((data) => {
			logger.info("Success removing certificate from doer = " + JSON.stringify(req.body));
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error removing certificate from doer = " + JSON.stringify(req.body) + " error: " + err.message);
			res.status(500).send("Some error occurred while removing certificate from doer = : " + err.message);
		});
}

module.exports = {
	create,
	get,
	assignCertificateToDoer,
	removeCertificateFromDoer,
};
