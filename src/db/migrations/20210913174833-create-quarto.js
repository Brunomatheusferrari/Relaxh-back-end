'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      tipo_quarto: {
        type: Sequelize.ENUM("Standart", "Premium", "Deluxe"),
        allowNull: false
      },
      numero_pessoas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numero_quarto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      disponibilidade: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('quartos');
  }
};





