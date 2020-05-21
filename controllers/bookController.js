const { Livro } = require("../models");
module.exports = {
  async create(req, res){
    const { titulo, autor, disponibilidade, localizacao } = req.body
    const [photo] = req.files
    try {
      Livro.create({
        titulo,
        autor,
        disponibilidade,
        localizacao,
        photo: photo.filename,
        users_id: req.session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return res.render('home-logado', {usuario: req.session.user})
    } catch (error) {
      console.log(error)
    }
   

  }
}