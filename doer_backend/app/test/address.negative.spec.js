var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const fs = require("fs");
const path = require("path");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

var test_uris = require("./data/test.uris.js");

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

let globalAddressId = "";

describe("ADDRESS API Tests -- NEGATIVE TESTS", function () {
	test("Create Address, missing req body", async () => {
		const res = await request.post(test_uris.createAddressUri);

		expect(res.status).toBe(400);
	});

	test("Get Address by ID,Address ID not INTEGER", async () => {
		const res = await request.get(test_uris.getAddressByIdUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(400);
	});
});
