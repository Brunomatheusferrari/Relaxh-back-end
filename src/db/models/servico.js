'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
    static associate(models) {
      this.belongsTo(models.Quarto, { foreignKey: "id_quarto" }),
      this.belongsToMany(models.Comida, { through: "comida_servico", foreignKey: "id_servico",as: "comidas" })
    }
  };
  Servico.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Delivery","Limpeza"]]
      }
    },
    horario: {
      type: DataTypes.DATE,
    },
    descricao: {
      type: DataTypes.STRING
    },
    id_quarto: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "quartos"
        },
        key: "id"
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Servico',
  });
  return Servico;
};