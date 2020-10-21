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
  };
  BookTicket.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    depart_date: DataTypes.STRING,
    TrainId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookTicket',
  });
  return BookTicket;
};