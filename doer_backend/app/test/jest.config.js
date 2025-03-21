// jest.config.js
module.exports = {
	verbose: true,
	// The glob patterns Jest uses to detect test files
	testMatch: ["**/(*.)+(spec).js?(x)"],
	reporters: [
		"default",
		[
			"../../node_modules/jest-html-reporters",
			{
				publicPath: "./test-report",
				filename: "report.html",
				darkTheme: true,
				includeConsoleLog: true,
			},
		],
	],
	globals: {
		__DEV__: true,
		API_ENDPOINT: "http://127.0.0.1:8080/api/doer",
		DOER_AUTH_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2VySWQiOjQ5LCJ0eXBlIjoiZG9lciIsInVzZXJuYW1lIjoiQmlsbHlIaWxsIiwiaWF0IjoxNzQyNTI5MDQzfQ.Tj3RsARAP9huj5qiMIabSVC-OTEt7Q2R2mAp4nF7ZQ4",
		USER_AUTH_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJKb2huRG9lIiwiaWF0IjoxNzQyNTI5MDQzfQ.hwF41LysRmU5WVckpt_cAzx0gFt7kcDY0_j2RtNyZFo",
	},
};
