module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define(
    "Contato",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      rua:DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      uf: DataTypes.STRING,
      cep: DataTypes.STRING,
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey:true,
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

  Contato.associate = (models) => {
    Contato.belongsTo(models.User, {
      foreignKey: "users_id",
      as: "user",
    });
  }
  
    return Contato;
};
  