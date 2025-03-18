const reqCreateUser_1 = {
	name: "John Doe",
	phone_number: "555654444",
	addresses: [
		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
		{ type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
	],
};

const reqRegisterUser_1 = {
	username: "JohnDoe",
	password: "555654444",
	type: "user"
};

const reqLoginUser_1 = {
	username: "JohnDoe",
    	password: "555654444"
};


const reqCreateUser_Malformed = {
	name: "user bill",
};

module.exports = {
	reqCreateUser_1,
	reqCreateUser_Malformed,
	reqRegisterUser_1,
	reqLoginUser_1

};
