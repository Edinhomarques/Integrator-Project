module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Livro, {
      foreignKey: "users_id",
      as: "user",
    })
  };
  return User;
};
