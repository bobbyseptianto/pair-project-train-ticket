'use strict';
const {
  Model
} = require('sequelize');

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

    static generateSerial() {
      var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        serialLength = 5,
        randomSerial = "",
        i,
        randomNumber;
      for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
      }
      return randomSerial;
    }

  };
  BookTicket.init({
    depart_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Departure date is required!'
        }
      }
    },
    TrainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Please select a train!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    booking_code: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.booking_code = this.generateSerial();
      }
    },
    sequelize,
    modelName: 'BookTicket',
  });

  return BookTicket;
};