module.exports = (sequelize, DataTypes) => {
  const Doacao = sequelize.define(
    "Doacao",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      livros_id:{
        type:DataTypes.INTEGER,
        unique:true
      },
      data_doacao: {
        allowNull: false,
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false,
    }

  );

  Doacao.associate = (models) => {
    Doacao.belongsTo(models.User, {
      foreignKey: "users_id",
      as: "user",
    });
    Doacao.belongsTo(models.Livro, {
      foreignKey: "livros_id",
      as: "livro",
    });

  }
  
    return Doacao;
};
  