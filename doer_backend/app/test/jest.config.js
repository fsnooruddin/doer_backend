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
	},
};
