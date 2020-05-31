module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define(
    "Livro",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      titulo:  {
        allowNull: false,
        type: DataTypes.STRING
      },
      autor: DataTypes.STRING,
      photo: DataTypes.STRING,
      disponibilidade: DataTypes.STRING,
      localizacao: DataTypes.STRING,
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

  Livro.associate = (models) => {
    Livro.belongsTo(models.User, {
      foreignKey: "users_id",
      as: "user",
    });
    Livro.hasOne(models.Emprestimo, {
      foreignKey: "livros_id",
      as: "emprestimo",
    });
    Livro.hasOne(models.Doacao, {
      foreignKey: "livros_id",
      as: "doacao",
    });
  };
  
  return Livro;
};
  