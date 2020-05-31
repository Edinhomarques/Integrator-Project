'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const LivrosTable = queryInterface.createTable("doacoes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      livros_id: {
        type: Sequelize.INTEGER,
        unique:true,
        references: {
          model: "livros",
          key: "id"
        }
      },
      data_doacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    return LivrosTable
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("doacoes")
  }
};

