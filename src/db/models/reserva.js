'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: "id_usuario", as: "usuario" })
      this.belongsTo(models.Quarto, { foreignKey: "id_quarto", as: "quarto" })
    }
  };
  Reserva.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      allowNull: false
    },
    numero_quarto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_entrada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_saida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "usuarios"
        },
        key: "id"
      },
      allowNull: false
    },
    id_quarto: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "quartos"
        },
        key: "id"
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};