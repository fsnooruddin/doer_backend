module.exports = (sequelize, Sequelize) => {
	const DoerCertificateAssociation = sequelize.define(
		"doer_certificate_association",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
	return DoerCertificateAssociation;
};
