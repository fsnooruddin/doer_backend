module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    parent_id: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
     img_url: {
          type: Sequelize.STRING
        }
  } , {
    tableName: 'categories'
  }
  );

  return Category;
};

