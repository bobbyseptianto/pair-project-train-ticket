'use strict';
const {
  Model
} = require('sequelize');

const generateSerial = require("../helpers/bookingCodeGenerator");

module.exports = (sequelize, DataTypes) => {
  class BookTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookTicket.belongsTo(models.Train, {foreignKey: "TrainId"})
      BookTicket.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  BookTicket.init({
    depart_date: DataTypes.STRING,
    TrainId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    booking_code: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.booking_code = generateSerial();
      }
    },
    sequelize,
    modelName: 'BookTicket',
  });

  return BookTicket;
};