var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");


const fs = require("fs");
const path = require("path");

var global_userId = null;
var global_doerId = null;


const global_modules = {};
function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	//console.log(absolutePath);
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
			//	console.log(`Loaded module: ${moduleName}`);
			// Use loadedglobal_modules[moduleName] to access the module's exports
		}
	}
	//	console.log(global_modules["address.test.data"].reqCreateAddress_1);
}

beforeAll(() => {
	//	console.log("before all");
	const currentWorkingDirectory = process.cwd();
	//console.log(`Current working directory: ${currentWorkingDirectory}`);

	loadModules("./data");
});

var test_uris = require("./data/test.uris.js");

describe("AUTH API Tests -- NEGATIVE TESTS", () => {
	test("Register user malformed request", async () => {
		const res = await request.post(test_uris.registerUserUri).send(global_modules["auth.test.data"].reqRegisterDoer_1_malformed).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(500);

	});

test("Login doer with empty body", async () => {
    		const res = await request.post(test_uris.loginUserUri).send("").set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
        		expect(res.status).toBe(500);
        		console.log(res.body);

    	});

    	test("Login doer with malformed request", async () => {
    		const res = await request.post(test_uris.loginUserUri).send(global_modules["auth.test.data"].reqLoginUser_wrong_password_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
        		expect(res.status).toBe(400);
        		console.log(res.body);

    	});
});
