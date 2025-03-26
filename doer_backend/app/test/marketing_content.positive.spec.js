var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const fs = require("fs");
const path = require("path");

var global_contentId = null;
var global_imageName = null;

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
		console.log(res.body);
		expect(JSON.stringify(res.body)).toContain("marketing_content_id");
		global_contentId = res.body.marketing_content_id;
	});

		test("Upload Image Data", async () => {
    		const res = await request.post(test_uris.uploadImageDataUri).attach("image", "data/image.png").set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
    		expect(res.status).toBe(200);
    		console.log(res.body);
    		expect(JSON.stringify(res.body)).toContain("success");
    		var str = JSON.stringify(res.body);
    		console.log(str);
    		var parts = str.split(":");
    		console.log(parts[1]);
    		console.log(parts[0]);
    		console.log(parts[2]);
    		global_imageName = parts[2].slice(1, -2);
    		console.log("global_imageName = " + global_imageName);
    	});


		test("Associate Image data to meta data", async () => {
            		const res = await request.post(test_uris.associateImageAndMetaDataUri + "?content_id=" + global_contentId + "&img_name=" + global_imageName).set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
            		expect(res.status).toBe(200);
            		expect(JSON.stringify(res.body)).toContain("success");
            	});

            			test("Get Marketing Content", async () => {
                            		const res = await request.get(test_uris.getMarketingContentUri + "?content_id=" + global_contentId).set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
                            		expect(res.status).toBe(200);
                            		expect(JSON.stringify(res.body)).toContain("marketing_content_id");
                            		console.log(res.body);
                            	});
});
