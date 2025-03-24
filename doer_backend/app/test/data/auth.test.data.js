
const reqRegisterUser_1 = {
	username: "JohnDoe",
	password: "555654444",
	type: "user",
	id: "23"
};

const reqRegisterDoer_1 = {
	username: "BillyHill",
	password: "555654444",
	type: "doer",
	id: "23"
};

const reqRegisterDoer_1_malformed = {
	username: "BillyHill",
	password: "555654444",
	id: "23"
};

const reqLoginUser_1 = {
	username: "JohnDoe",
    	password: "555654444",
    	type: "user",
};

const reqLoginDoer_1 = {
	username: "BillyHill",
    password: "555654444",
    type: "doer",
};

const reqLoginUser_wrong_password_1 = {
	username: "JohnDoe",
    	password: "noneeeejj",
    	type: "user",
};

const reqLoginDoer_wrong_password_1 = {
	username: "BillyHill",
    password: "9028272",
    type: "doer",
};

module.exports = {
	reqRegisterUser_1,
	reqRegisterDoer_1,
	reqLoginUser_1,
	reqLoginDoer_1,
	reqLoginUser_wrong_password_1,
	reqLoginDoer_wrong_password_1,
    reqRegisterDoer_1_malformed
};
