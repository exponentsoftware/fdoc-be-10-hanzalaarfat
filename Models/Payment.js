module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    paymentId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    orderId: {
      type: Sequelize.STRING,
      required: true,
    },

    amount: {
      type: Sequelize.INTEGER,
      required: true,
    },
  });

  return Payment;
};
