const reqCreateBadge_1 = {
	name: "cool badge",
	description: "Best badge Ever",
	icon_url: "icon.pic",
};

const reqCreateBadge_2 = {
	name: "best badge",
	description: "awesome badge Ever",
	icon_url: "icon.pic",
};

const reqCreateBadge_Malformed = {
	description: "Best badge Ever",
	icon_url: "icon.pic",
};

const reqCreateBadgeAssociation_1 = {
	user_id: 1,
	badge_id: 1,
};

const reqCreateBadgeAssociation_2 = {
	user_id: 1,
	badge_id: 2,
};

const reqCreateBadgeAssociation_Malformed = {
	badge_id: 1,
};

module.exports = {
	reqCreateBadge_1,
	reqCreateBadge_2,
	reqCreateBadgeAssociation_1,
	reqCreateBadgeAssociation_2,
	reqCreateBadge_Malformed,
	reqCreateBadgeAssociation_Malformed,
};
