const { User, Contato, Livro } = require("../models");
const { Op } = require('sequelize')
const bcrypt = require("bcrypt");

const authController = {
  store: async (req, res) => {
    const { email, password } = req.body;

    const usuario = await User.findOne({
      where:{
        email: email,
      }
    });

    if (!usuario || !bcrypt.compareSync(password, usuario.dataValues.password)) {
      res.render("home", {
        msgLogin: "Email ou senha errados!",
        title: 'Home'
      });
    }else {
      const usuarioContato = await Contato.findOne({
        where:{
          users_id: usuario.dataValues.id,
        }
      });

      req.session.user = {
        id: usuario.dataValues.id,
        email: usuario.dataValues.email,
        first_name:usuario.dataValues.first_name,
        last_name: usuario.dataValues.last_name,
        avatar: usuario.dataValues.avatar,
        userContato: usuarioContato.dataValues
      };
      const books = await Livro.findAll({
        where: {
          users_id: {
            [Op.ne]: req.session.user.id
          }
        },
        include: ['user']
      })
      books.map(book => console.log(book.user.first_name))
      const booksForDonation = books.filter(book => book.disponibilidade != 'emprestar') 
      const booksForSwap = books.filter(book => book.disponibilidade != 'doar') 

      res.render('home-logado', { usuario: req.session.user, title: 'Home', booksForDonation, booksForSwap});
    }
  },

  destroy: (req, res) => {
    req.session.user = undefined;
    return res.redirect("/");
  },
};

module.exports = authController;
