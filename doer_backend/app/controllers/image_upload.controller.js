"use strict";
/**
 * @namespace Image Upload
 */


const db = require("../models");
const utils = require("../utils/Utils.js");
const Op = db.Sequelize.Op;
//const { Image Upload_requestCreateSchema } = require('../schemas/Image Upload_request.js');
const Joi = require("joi");
const logger = require("../utils/Logger.js");


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
async function create(req, res) {
	console.log("req body in create Image Upload: ");
	console.log(req);
	console.log("BODY");
	console.log(req.body);
console.log("FILE");
	console.log(req.files);

	 let image = req.files.file;
//console.log("new Image Upload in create Image Upload: " + JSON.stringify(image));
console.log("new Image Upload in create Image Upload: " + JSON.stringify(image.mimetype));
        if (!image)  {
        console.log("bad request 2");
        return res.sendStatus(400);
        }


    if(image.mimetype.includes("image"))  {
         image.mv(__dirname + '/upload/' + image.name);

               res.sendStatus(200);
    } else {
     console.log("bad request 1");
            return res.sendStatus(400);
    }


}

module.exports = {
	create
};
