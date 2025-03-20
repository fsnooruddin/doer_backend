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
		DOER_AUTH_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJkb2VyIiwidXNlcm5hbWUiOiJCaWxseUhpbGwiLCJpYXQiOjE3NDI0MzAyNDB9.8DZ6GLT21oLUZXJ9rmbV-p9xHvZFL4QqOSKThgGtA3g",
		USER_AUTH_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJKb2huRG9lIiwiaWF0IjoxNzQyNDMwMjQwfQ.rIvyH1ajjuA2R11pW0Wfk6YfiubbubP-gMijEBrqrek",
	},
};
