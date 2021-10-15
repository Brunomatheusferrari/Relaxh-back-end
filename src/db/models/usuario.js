'use strict';
const {
  Model, UUID, Sequelize
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Reserva, {foreignKey: "id_usuario"})
      this.hasOne(models.RefreshToken, { foreignKey: "user_id" });
    }

    isPasswordValid(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined
      }
    }
  };
  Usuario.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este e-mail já está cadastrado"
      },
      validate: {
        isEmail: {
          msg: "Email Inválido"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue("password", bcrypt.hashSync(password, 10));
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "guest",
      allowNull: false,
      validate: {
        isIn: [["admin", "user", "guest"]]
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};