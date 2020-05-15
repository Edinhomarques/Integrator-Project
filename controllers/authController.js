const { User } = require("../models");
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
        msg: "Email ou senha errados!",
        title: 'Home'
      });
    }else {
      const nameUsuario = `${usuario.dataValues.first_name} ${usuario.dataValues.last_name}`
      
    req.session.user = {
      id: usuario.dataValues.id,
      name: nameUsuario ,
      email: usuario.dataValues.email,
      avatar:usuario.dataValues.avatar
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
