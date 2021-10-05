module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("Todo", {
    todoId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: Sequelize.STRING,
      required: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      required: true,
    },
    category: {
      type: Sequelize.DataTypes.ENUM("task", "hobby", "work"),
      defaultValue: "task",
    },
  });

  return Todo;
};
