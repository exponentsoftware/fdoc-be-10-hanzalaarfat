module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: Sequelize.INTEGER,
      required: true,
    },

    todoId: {
      type: Sequelize.INTEGER,
      required: true,
    },
  });

  return Rating;
};
