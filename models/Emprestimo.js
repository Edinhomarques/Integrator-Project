module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define(
    "Emprestimo",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      livros_id: {
        type: DataTypes.INTEGER,
        unique:true,
        references: {
          model: "livros",
          key: "id"
        }
      },
      data_emprestimo: {
        allowNull: false,
        type: DataTypes.DATE
      },
      data_devolucao: {
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

  Emprestimo.associate = (models) => {
    Emprestimo.belongsTo(models.Livro, {
      foreignKey: "livros_id",
      as: "livro",
    });
  }
  
    return Emprestimo;
};
  