'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quarto extends Model {
    static associate(models) {
      this.hasOne(models.Reserva, {foreignKey: "id_quarto", as: "reserva"} )
      this.hasMany(models.Servico, {foreignKey: "id_quarto"})
    }
  };
  Quarto.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tipo_quarto: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Standart", "Premium", "Deluxe"]]
      },
      allowNull: false
    },
    numero_pessoas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numero_quarto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: "Quarto já Cadastrado"
      }
    },
    disponibilidade: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Quarto',
  });
  return Quarto;
};