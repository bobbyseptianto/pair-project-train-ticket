'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Train.hasMany(models.BookTicket, {foreignKey: "TrainId"})
    }

    get separateRoute() {
      return this.route.split('-');
    }

  };
  Train.init({
    train_name: DataTypes.STRING,
    route: DataTypes.STRING,
    depart_time: DataTypes.STRING,
    arrived_time: DataTypes.STRING,
    class_type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Train',
  });
  return Train;
};