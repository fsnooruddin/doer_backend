// jest.config.js
module.exports = {
//   setupFiles: ['./app/test/global/setup_test_data.js'],
	verbose: true,
	// The glob patterns Jest uses to detect test files
//	testMatch: ["**/test/*job.spec.js"],
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
};
