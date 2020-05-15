'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Userstable = queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name:Sequelize.STRING,
      last_name: Sequelize.STRING,
      password: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique : true,
      },
      avatar: {
        defaultValue: `images/avatar/padrao.jpg`,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
    return Userstable
  },
  down: function(migration, Sequelize, done) {
    migration.dropTable("Users").done(done);
  }
}