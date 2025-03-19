const reqCreateCertificate_1 = {
	name: "cool badge",
	description: "Best badge Ever",
	icon_url: "icon.pic",
};

const reqCreateCertificate_2 = {
	name: "best badge",
	description: "awesome badge Ever",
	icon_url: "icon.pic",
};

const reqCreateCertificate_Malformed = {
	description: "Best badge Ever",
	icon_url: "icon.pic",
};

const reqCreateCertificateAssociation_1 = {
	user_id: 1,
	badge_id: 1,
};

const reqCreateCertificateAssociation_2 = {
	user_id: 1,
	badge_id: 2,
};

const reqCreateCertificateAssociation_Malformed = {
	badge_id: 1,
};

module.exports = {
	reqCreateCertificate_1,
	reqCreateCertificate_2,
	reqCreateCertificateAssociation_1,
	reqCreateCertificateAssociation_2,
	reqCreateCertificate_Malformed,
	reqCreateCertificateAssociation_Malformed,
};
