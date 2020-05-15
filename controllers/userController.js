const { User, Contato } = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  store: async (req, res) => {
    const { nome, sobrenome, email, password, rua, numero, bairro, cidade, uf, cep } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      first_name: nome,
      last_name: sobrenome,
      email: email,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (newUser) {
      const User_id = await User.findOne({
        where:{
          first_name: nome,
          last_name: sobrenome,
        }
      });
      const newUserContato = await Contato.create({
        rua:rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,
        users_id: User_id.dataValues.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.render('home', { title: 'Home' });
    } else {
      return res.render("home", {
        msg: "Erro ao cadastrar um usuario",
      });
    }
  },
  update: async (req, res) => {
    const { nome, sobrenome, email, password, rua, numero, bairro, cidade, uf} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const id = req.session.user.id

    const updateUser = await User.update({
      first_name: nome,
      last_name: sobrenome,
      email: email,
      password: hashPassword,
      updatedAt: new Date(),
    },{
      where:{id:id}
    });

    const updateUserContato = await Contato.create({
      rua:rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      users_id:id,
      updatedAt: new Date(),
    },{
      where:{users_id:id}
    });

    return res.render('home', { title: 'Home' });
  },
  updateProfile: async (req, res) => {
    const [avatar] = req.files;
    const id = req.session.user.id

    const updateUserAvatar = await User.update({
      avatar: `/images/avatar/${avatar.filename}`,
    },{
      where:{id:id}
    });
    return res.render('home', { title: 'Home' });
  }

};

module.exports = userController;
