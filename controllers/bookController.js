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
  },

  async listBookForDonation (req, res) {
    const books = await Livro.findAll({
      where: {
        disponibilidade: 'doar',
        users_id: req.session.user.id
      }
    })
    res.render('listar-meus-livros-para-doacao', {usuario:req.session.user, books})
  },

  async listBookForExchange (req, res) {
    const books = await Livro.findAll({
      where: {
        disponibilidade: 'emprestar',
        users_id: req.session.user.id
      }
    })
    //books.map(item => console.log(item.titulo))
    res.render('listar-meus-livros-para-troca', {usuario:req.session.user, books})
  },

  async updateBook (req, res) {
    const { idBook, titulo, autor, disponibilidade, localizacao } = req.body

    await Livro.update({
      titulo,
      autor,
      disponibilidade,
      localizacao,
    }, {
      where: { id: idBook }
    })
    if(disponibilidade == 'doar'){
      const books = await Livro.findAll({
        where: {
          disponibilidade: 'doar',
          users_id: req.session.user.id
        }
      })
      res.render('listar-meus-livros-para-doacao', {usuario:req.session.user, books})
    } else {
      const books = await Livro.findAll({
        where: {
          disponibilidade: 'emprestar',
          users_id: req.session.user.id
        }
      })
      res.render('listar-meus-livros-para-troca', {usuario:req.session.user, books})
      
    }
  }
}