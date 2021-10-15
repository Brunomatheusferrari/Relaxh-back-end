'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comida extends Model {
    static associate(models) {
      this.belongsToMany(models.Servico, { through: "comida_servico",foreignKey: "id_comida", as: "servicos"})
    }
  };
  Comida.init({
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Comida","Bebida"]]
      }
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comida',
  });
  return Comida;
};