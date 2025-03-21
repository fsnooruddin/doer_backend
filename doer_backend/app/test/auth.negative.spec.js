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

describe("AUTH API Tests -- POSITIVE TESTS", () => {
	test("Register user", async () => {
		const res = await request.post(test_uris.registerUserUri).send(global_modules["auth.test.data"].reqRegisterUser_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
	});

	test("Login user", async () => {
		const res = await request.post(test_uris.loginUserUri).send(global_modules["auth.test.data"].reqLoginUser_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
    		expect(res.status).toBe(200);
    		console.log(res.body);
    		expect(JSON.stringify(res.body)).toContain("token");
	});

		test("Register doer", async () => {
    		const res = await request.post(test_uris.registerUserUri).send(global_modules["auth.test.data"].reqRegisterDoer_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("doer_id");
    	});

    	test("Login doer", async () => {
    		const res = await request.post(test_uris.loginUserUri).send(global_modules["auth.test.data"].reqLoginDoer_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
        		expect(res.status).toBe(200);
        		console.log(res.body);
        		expect(JSON.stringify(res.body)).toContain("token");
    	});
});
