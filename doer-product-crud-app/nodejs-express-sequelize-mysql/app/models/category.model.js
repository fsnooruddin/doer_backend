module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    parent_id: {
      type: Sequelize.INTEGER
    },
   name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    time_to_complete: {
        type: Sequelize.STRING
    },
    price_range: {
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

