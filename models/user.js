'use strict';
const {
  Model, ValidationError
} = require('sequelize');

const bcrypt = require('bcryptjs');

var nodemailer = require('nodemailer');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.BookTicket, {foreignKey: "UserId"})
    }

    get fullName() {
      return `${this.first_name} ${this.last_name}`;
    }

  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name is required!'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name is required!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required!'
        },
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Gender is required!'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address is required!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
      },
      afterCreate(instance, options) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'bookmytrainxxx@gmail.com',
            pass: 'bookmytrain99'
          }
        });
        
        var mailOptions = {
          from: 'bookmytrainxxx@gmail.com',
          to: instance.email,
          subject: 'Account Register Success',
          text: `
          Akun BookMyTrain kamu berhasil dibuat!

          Jangn beritahu data ini kepada siapapun!
          USERNAME : ${instance.username};
          PASSWORD : ${instance.password};
          `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};