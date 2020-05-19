const { User, Contato } = require("../models");
const bcrypt = require("bcrypt");

const authController = {
  store: async (req, res) => {
    const { email, password } = req.body;

    const usuario = await User.findOne({
      where:{
        email: email,
      }
    });

    const usuarioContato = await Contato.findOne({
      where:{
        users_id: usuario.dataValues.id,
      }
    });

    if (!usuario || !bcrypt.compareSync(password, usuario.dataValues.password)) {
      res.render("home", {
        msgLogin: "Email ou senha errados!",
        title: 'Home'
      });
    }else {

    req.session.user = {
      user: usuario.dataValues,
      userContato: usuarioContato.dataValues
    };

    res.render('home-logado', { usuario: req.session.user, title: 'Home'});
    }
  },

  destroy: (req, res) => {
    req.session.user = undefined;
    return res.redirect("/");
  },
};

module.exports = authController;
