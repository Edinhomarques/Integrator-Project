'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Newsletterstable = queryInterface.createTable("Newsletters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique : true,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
    return Newsletterstable
  },
  down: function(migration, Sequelize, done) {
    migration.dropTable("Newsletters").done(done);
  }
}