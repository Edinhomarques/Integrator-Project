module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define(
    "Newsletter",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique : true,
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

    return Newsletter;
};
  