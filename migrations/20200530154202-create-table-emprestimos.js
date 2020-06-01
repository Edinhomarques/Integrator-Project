'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const EmprestimosTable = queryInterface.createTable("emprestimos", {
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
      data_emprestimo: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_devolucao: {
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
    return EmprestimosTable
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("emprestimos")
  }
};

