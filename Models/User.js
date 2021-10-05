module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
    },

    role: {
      type: Sequelize.DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    phone: {
      type: Sequelize.STRING,
      required: true,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    subsription: {
      // date after payment date
      type: Sequelize.DATE,
    },
    date: {
      type: Sequelize.STRING,
      required: true,
    },
  });

  return User;
};
