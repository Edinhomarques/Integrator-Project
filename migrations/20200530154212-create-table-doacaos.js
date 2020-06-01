'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DoacaosTable = queryInterface.createTable("doacaos", {
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
    return DoacaosTable
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("doacaos")
  }
};

