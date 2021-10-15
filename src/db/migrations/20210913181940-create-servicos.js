'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('servicos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      tipo: {
        allowNull: false,
        type: Sequelize.ENUM("Delivery", "Limpeza")
      },
      horario: {
        type: Sequelize.DATE
      },
      descricao: {
        type: Sequelize.STRING,
      },
      id_quarto:{
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('servicos');
  }
};