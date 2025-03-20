var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
var {
	reqCreateBadge_1,
	reqCreateBadge_2,
	reqCreateBadgeAssociation_1,
	reqCreateBadgeAssociation_2,
	reqCreateBadge_Malformed,
	reqCreateBadgeAssociation_Malformed,
} = require("./data/badge.test.data.js");

var test_uris = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		return response;
	} catch (error) {
		throw error;
	}
}

var global_badgeId = null;
var global_userId = null;
const global_modules = {};
function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	console.log(absolutePath);
	fs.readdirSync(absolutePath).forEach((file) => {
		const filePath = path.join(absolutePath, file);
		const fileStat = fs.statSync(filePath);
		//	console.log(filePath);
		if (fileStat.isFile() && path.extname(file) === ".js") {
			const moduleName = path.basename(file, ".js");
			global_modules[moduleName] = require(filePath);
		}
	});
	// Accessing loaded modules
	for (const moduleName in global_modules) {
		if (global_modules.hasOwnProperty(moduleName)) {
			//		console.log(`Loaded module: ${moduleName}`);
			// Use loadedglobal_modules[moduleName] to access the module's exports
		}
	}
	console.log(global_modules["address.test.data"].reqCreateAddress_1);
}

beforeAll(() => {
	console.log("before all");
	const currentWorkingDirectory = process.cwd();
	console.log(`Current working directory: ${currentWorkingDirectory}`);

	loadModules("./data");
});

describe("BADGE API Tests -- POSITIVE TESTS", () => {
	test("Create a new user", async () => {
		const res = await request.post(test_uris.createUserUri).send(global_modules["user.test.data"].reqCreateUser_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
		global_userId = res.body.user_id;
	});

	test("Create a new BADGE", async () => {
		reqCreateBadge_1.user_id = global_userId;
		const res = await request.post(test_uris.createBadgeUri).send(reqCreateBadge_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
		global_badgeId = res.body.badge_id;
	});

	test("Create a new BADGE", async () => {
		const res = await request.post(test_uris.createBadgeUri).send(reqCreateBadge_2).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Get BADGE by ID", async () => {
		const res = await request.get(test_uris.getBadgeByIdUri + "?id=" + global_badgeId).set("Authorization", USER_AUTH_TOKEN);
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Create a BADGE association", async () => {
		reqCreateBadgeAssociation_1.user_id = global_userId;
		reqCreateBadgeAssociation_1.badge_id = global_badgeId;
		console.log(reqCreateBadgeAssociation_1);
		const res = await request.post(test_uris.assignBadgeUserUri).send(reqCreateBadgeAssociation_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("id");
	});
});
