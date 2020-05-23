const { User, Contato } = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  store: async (req, res) => {
    const { nome, sobrenome, phoneNumber, email, password, rua, numero, bairro, cidade, uf, cep } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(phoneNumber)
    try{
      const newUser = await User.create({
        first_name: nome,
        last_name: sobrenome,
        email: email,
        phoneNumber,
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
        
        await Contato.create({
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
      }
    } catch(err) {
        console.log(err.errors)
        return res.render("home", {
          msgRegistro: "Erro ao cadastrar um usuario",
        })
      }
  },

  update: async (req, res) => {
    const { nome, sobrenome, email, phoneNumber, password, rua, numero, bairro, cidade, uf} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const id = req.session.user.id

    await User.update({
      first_name: nome,
      last_name: sobrenome,
      email: email,
      phoneNumber,
      password: hashPassword,
      updatedAt: new Date(),
    },{
      where:{id:id}
    });

    await Contato.update({
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

  updateAvatar: async (req, res) => {
    const [avatar] = req.files;
    const id = req.session.user.id

    const updateUserAvatar = await User.update({
      avatar: `/images/avatar/${avatar.filename}`,
    },{
      where:{id:id}
    });

    return res.render('perfil', {usuario: req.session.user, title: 'Perfil' });
  }
};

module.exports = userController;
