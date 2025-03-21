"use strict";

/**
 * @namespace User
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const jwt = require("jsonwebtoken");
const User = db.users;
const Job = db.job_requests;
const Address = db.addresses;
const Op = db.Sequelize.Op;
const Rating = db.user_ratings;
const UserCredentials = db.user_credentials;
const DoerCredentials = db.doer_credentials;
const logger = require("../utils/Logger.js");
const appConfig = require("../config/doer_app.config.js");

async function register(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	console.log("body = " + JSON.stringify(req.body));
	const hashedPassword = await Utils.hashPassword(password);
	var creds = {
		username: username,
		password: hashedPassword,
		type: req.body.type,
	};
	try {
		var data = null;
		if (req.body.type == "user") {
			creds.user_id = req.body.id;
			data = await UserCredentials.create(creds);
		} else {
			creds.doer_id = req.body.id;
			data = await DoerCredentials.create(creds);
		}
		console.log("auth-controller register, creds = " + JSON.stringify(creds));

		if (data == null) {
			res.status(500).send({ message: "auth-controller register failed" });
			return;
		}
		logger.info("auth-controller register success: " + JSON.stringify(data));
		res.status(200).send(data);
	} catch (err) {
		logger.error("auth-controller register  failed: " + " error: " + err.message);
		res.status(500).send("failure to register user, error: " + err.message);
		return;
	}
}

async function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	var user = null;
	try {
		if (req.body.type === "doer") {
			user = await DoerCredentials.findOne({ where: { username: username } });
		} else {
			user = await UserCredentials.findOne({ where: { username: username } });
		}
		logger.info("auth-controller login call, user credentials " + JSON.stringify(user));
		if (user == null) {
			logger.error("auth-controller login user failed, find creds failed...");
			res.status(401).send("failure to login user, couldn't find user, call register first.");
			return;
		}
		var match = await Utils.comparePassword(password, user.password);
		if (match) {
			var nObj = {};
			if (req.body.type === "doer") {
				nObj = { doerId: user.id, type: user.type, username: user.username };
			} else {
				nObj = { userId: user.id, type: user.type, username: user.username };
			}
			const token = await jwt.sign(nObj, appConfig.AUTH_TOKEN_SECRET);
			logger.info("User is successfully logged in: " + token);
			res.status(200).json({ token });
			return;
		} else {
			logger.info("User login failed ");
			res.status(401).send("Authentication failed");
			return;
		}
	} catch (err) {
		logger.error("auth-controller login user failed: " + " error: " + err.message);
		res.status(500).send("failure to login user, error: " + err.message);
		return;
	}
}

module.exports = {
	register,
	login,
};
