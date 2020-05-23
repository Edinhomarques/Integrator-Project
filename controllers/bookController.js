const { Livro } = require("../models");
const { Op } = require('sequelize')

module.exports = {
  async create(req, res){
    const { titulo, autor, disponibilidade, localizacao } = req.body
    const [photo] = req.files
    try {
      await Livro.create({
        titulo,
        autor,
        disponibilidade,
        localizacao,
        photo: photo.filename,
        users_id: req.session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      const books = await Livro.findAll({
        where: {
          users_id: {
            [Op.ne]: req.session.user.id
          }
        },
        include: ['user']
      })
      
      const booksForDonation = books.filter(book => book.disponibilidade != 'emprestar') 
      const booksForSwap = books.filter(book => book.disponibilidade != 'doar')

      return res.render('home-logado', {usuario: req.session.user, booksForDonation, booksForSwap})
    } catch (error) {
      console.log(error)
    }
  },

/*
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
  },
*/

  async listBooksForDonation(req, res){
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
    res.render('listar-livros-para-doacao', { title: 'Home', usuario:req.session.user, booksForDonation}); 
  },

  async listBookForSwap(req, res){
    const books = await Livro.findAll({
      where: {
        users_id: {
          [Op.ne]: req.session.user.id
        }
      },
      include: ['user']
    })
    const booksForSwap = books.filter(book => book.disponibilidade != 'doar')
    res.render('listar-livros-para-troca', { title: 'Home', usuario:req.session.user, booksForSwap});
  }
}