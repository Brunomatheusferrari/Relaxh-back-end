'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      tipo_quarto: {
        type: Sequelize.ENUM("Standart", "Premium", "Delux")
      },
      numero_pessoas:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numero_quarto: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_entrada: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_saida: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      id_quarto: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "quartos",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reservas');
  }
};

