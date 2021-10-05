module.exports = (sequelize, Sequelize) => {
  const View = sequelize.define("view", {
    viewId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    view: {
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

  return View;
};
