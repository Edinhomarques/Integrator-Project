'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Messagestable = queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      assunto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
    return Messagestable
  },
  down: function(migration, Sequelize, done) {
    migration.dropTable("Messages").done(done);
  }
}