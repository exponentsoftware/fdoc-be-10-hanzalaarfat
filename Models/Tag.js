module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    tagId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    tagTitle: {
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
    category: {
      type: Sequelize.DataTypes.ENUM("task", "hobby", "work"),
    },
  });

  return Tag;
};
