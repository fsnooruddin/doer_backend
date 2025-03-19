var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");
const fs = require("fs");
const path = require("path");

var test_uris = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

var global_badgeId = null;
var global_doerId = null;
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

describe("CERTIFICATE API Tests -- POSITIVE TESTS", () => {
	test("Create a new doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
	});

	test("Create a new CERTIFICATE", async () => {
		var data = global_modules["certificate.test.data"].reqCreateCertificate_1;
		data.doer_id = global_doerId;
		const res = await request.post(test_uris.createCertificateUri).send(data).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("certificate_id");
		global_badgeId = res.body.certificate_id;
	});

	test("Create a new CERTIFICATE", async () => {
		const res = await request
			.post(test_uris.createCertificateUri)
			.send(global_modules["certificate.test.data"].reqCreateCertificate_2)
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("certificate_id");
	});

	test("Get CERTIFICATE by ID", async () => {
		const res = await request.get(test_uris.getCertificateByIdUri + "?id=" + global_badgeId);
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("certificate_id");
	});

	test("Create a CERTIFICATE association", async () => {
		var data = global_modules["certificate.test.data"].reqCreateCertificateAssociation_1;
		data.doer_id = global_doerId;
		data.certificate_id = global_badgeId;
		console.log(data);
		const res = await request.post(test_uris.assignCertificateDoerUri).send(data).set("Accept", "application/json");
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("id");
	});
});
