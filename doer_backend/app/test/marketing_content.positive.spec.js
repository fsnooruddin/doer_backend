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

describe("MARKETING CONTENT API Tests -- POSITIVE TESTS", () => {

	test("Upload Meta Data", async () => {
		const res = await request.post(test_uris.uploadMetaDataUri).send(global_modules["marketing_content.test.data"].metaData_1).set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("marketing_content_id");
	});

		test("Upload Image Data", async () => {
    		const res = await request.post(test_uris.uploadImageDataUri).attach("image", "data/image.png").set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("success");
    	});

		test("Upload Image Data", async () => {
    		const res = await request.post(test_uris.uploadImageDataUri).attach("image", "another.png").set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("success");
    	});
});
