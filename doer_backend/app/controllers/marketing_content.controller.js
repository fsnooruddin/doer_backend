"use strict";
/**
 * @namespace Image Upload
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");
const path = require('path');
const MarketingContent = db.marketing_content;
const appConfig = require("../config/doer_app.config.js");
/**
 * Create a Image Upload
 * @param {object} Image Upload - JSON representing Image Upload
 * @param {number} Image Upload.phone_number - Phone number requesting the Image Upload
 * @example
 * Sample payload:
 * {
 *    phone_number: "3032221234"
 *  }
 * @memberof Image Upload
 */
async function imageUpload(req, res) {
	//console.log(req.files);
	console.log(req.files["image"]);

	// Was a file submitted?
	//     if (!req.files || !req.files.file) {
	//       return res.status(422).send('No files were uploaded');
	//     }

	const uploadedFile = req.files["image"];
	console.log(uploadedFile.name);
	// Print information about the file to the console
	console.log(`File Name: ${uploadedFile.name}`);
	console.log(`File Size: ${uploadedFile.size}`);
	console.log(`File MD5 Hash: ${uploadedFile.md5}`);
	console.log(`File Mime Type: ${uploadedFile.mimetype}`);

	if (!uploadedFile) {
		logger.error("marketing-content controller, error uploading image, file data is missing");
		res.status(400).send({ message: "Error uploading image, data is missing is missing" });
		return;
	}

	if (uploadedFile.mimetype.includes("image")) {
		var full_path = path.join(__dirname , '..', appConfig.UPLOAD_DIR + "/" + uploadedFile.name);
		logger.info("marketing-content controller, image upload full_path: " + full_path);
		uploadedFile.mv(full_path);
		res.status(200).send({ message: "Marketing content, image upload success, filaname: " + full_path });
		return;
	} else {
		logger.error("marketing-content controller, error uploading image, file uploaded is not an image.");
		res.status(400).send({ message: "Error uploading image, file uploaded is not an image." });
		return;
	}
}

/**
 * Create a Image Upload
 * @param {object} Image Upload - JSON representing Image Upload
 * @param {number} Image Upload.phone_number - Phone number requesting the Image Upload
 * @example
 * Sample payload:
 * {
 *    phone_number: "3032221234"
 *  }
 * @memberof Image Upload
 */
async function metaDataUpload(req, res) {
	logger.info("marketing-content-controller create ... body = " + JSON.stringify(req.body));
	if (Object.keys(req.body).length === 0) {
		logger.error("marketing-content-controller create ... body null = " + JSON.stringify(req.body));
		res.status(400).send("Error creating marketing content, request body is null.");
		return;
	}

	const data_obj = req.body;
	try {
		const response_data = await MarketingContent.create(data_obj);
		logger.info("marketing-content-controller create SUCCESS ... ");
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("marketing-content-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating marketing content.",
		});
		return;
	}
}

/**
 * Create a Image Upload
 * @param {object} Image Upload - JSON representing Image Upload
 * @param {number} Image Upload.phone_number - Phone number requesting the Image Upload
 * @example
 * Sample payload:
 * {
 *    phone_number: "3032221234"
 *  }
 * @memberof Image Upload
 */
async function getMarketingContent(req, res) {

	let id = req.query.content_id;

    	try {
    		const response_data = await MarketingContent.findAll({ where: { marketing_content_id: id } });
    		logger.info("marketing-content-controller getMarketingContent, returning..." +
    		JSON.stringify(response_data));
    		res.status(200).send(response_data);
    		return;
    	} catch (err) {
    		logger.error("marketing-content-controller create call failed. error = " + err.message);
    		res.status(500).send({message: err.message || "Some error occurred while creating marketing content.",});
    		return;
    	}
}

async function associateImageAndMetaData(req, res) {

	let id = req.query.content_id;
	let image_name = req.query.img_name;
    logger.info("marketing_content-controller associateImageAndMetaData , id = " + id + " image_name = " + image_name);
    	try {
    		const response_data = await MarketingContent.update({image_name: image_name}, { where: { marketing_content_id: id } });
    		logger.info("marketing-content-controller associateImageAndMarketingContent, returning..." +
    		JSON.stringify(response_data));
    		var img_uri = "http://" + appConfig.SERVER_HOSTNAME + ":" + appConfig.SERVER_PORT + "/" + appConfig.UPLOAD_SERVE_PATH + "/" + image_name;
    		res.status(200).send({content_id: id, image_name: img_uri});
    		return;
    	} catch (err) {
    		logger.error("marketing-content-controller associateImageAndMarketingContent call failed. error = " + err.message);
    		res.status(500).send({message: err.message || "Some error occurred while associateImageAndMarketingContent marketing content.",});
    		return;
    	}
}

module.exports = {
	imageUpload,
	metaDataUpload,
	getMarketingContent,
	associateImageAndMetaData
};
