'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const LivrosTable = queryInterface.createTable("livros", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      autor: Sequelize.STRING,
      //genero: Sequelize.STRING,
      photo: Sequelize.STRING,
      disponibilidade: Sequelize.STRING,
      localizacao: Sequelize.STRING,
      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
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
    return queryInterface.dropTable("livros")
  }
};

