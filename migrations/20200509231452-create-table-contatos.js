'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const ContatosTable = queryInterface.createTable("Contatos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rua:Sequelize.STRING,
      numero: Sequelize.STRING,
      bairro: Sequelize.STRING,
      cidade: Sequelize.STRING,
      uf: Sequelize.STRING,
      cep: Sequelize.STRING,
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
    return ContatosTable
  },
  down: function(migration, Sequelize, done) {
    migration.dropTable("Contatos").done(done);
  }
}