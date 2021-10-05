module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    commentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    comment: {
      type: Sequelize.STRING,
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

  return Comment;
};
