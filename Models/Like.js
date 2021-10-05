module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    likeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    liked: {
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

  return Like;
};
