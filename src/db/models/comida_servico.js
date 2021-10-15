'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comida_Servico extends Model {
    static associate(models) {}
  };
  Comida_Servico.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    id_comida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "comidas",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    id_servico: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "servicos",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Comida_Servico',
    tableName: "comida_servico"
  });
  return Comida_Servico;
};