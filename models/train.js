'use strict';
const {
  Model, ValidationError
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
    train_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Train name is required!'
        }
      }
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Route is required!'
        }
      }
    },
    depart_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Depart time is required!'
        }
      }
    },
    arrived_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Arrived time is required!'
        }
      }
    },
    class_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Class type is required!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required!'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be an integer!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Train',
  });
  return Train;
};