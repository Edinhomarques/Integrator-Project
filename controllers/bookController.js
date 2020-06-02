const { Livro, Emprestimo, Doacao } = require("../models");
const { Op } = require('sequelize')

module.exports = {
  async create(req, res){
    const { titulo, autor, disponibilidade, localizacao } = req.body
    const [photo] = req.files
    const filename = photo != undefined && photo.filename != undefined ? photo.filename : null
    try {
      await Livro.create({
        titulo,
        autor,
        disponibilidade,
        localizacao,
        photo: filename,
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
        include: [ 
          'user',
          {
          model: Emprestimo,
          as: 'emprestimo'
          },
          {
            model: Doacao,
            as: 'doacao'
          }
        ]
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
 
  async listAll(req, res){
    const { titulo } = req.body
    const books = await Livro.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`
        }
      },
     include: [ 
        'user',
        {
        model: Emprestimo,
        as: 'emprestimo'
        },
        {
          model: Doacao,
          as: 'doacao'
        }
      ]
    })
    res.render('busca', { title: 'Home', usuario:req.session.user, books});
  },

  async listBooksForDonation(req, res){
    const { page=1 }= req.query;
    const {count: total, rows: books} = await Livro.findAndCountAll({
      where: {
        users_id: {
          [Op.ne]: req.session.user.id
        }
      },
      limit: 8,
      offset: (page - 1)*5,
      include: [ 
        'user',
        {
        model: Emprestimo,
        as: 'emprestimo'
        },
        {
          model: Doacao,
          as: 'doacao'
        }
      ]
    })
    books.map(book => console.log(book.user.first_name))
    const booksForDonation = books.filter(book => book.disponibilidade != 'emprestar')
    let totalPages = Math.ceil(total/8);
    res.render('listar-livros-para-doacao', { title: 'Home', usuario:req.session.user, booksForDonation, totalPages}); 
  },

  async listBookForSwap(req, res){
    const { page=1 }= req.query;
    const {count: total, rows: books} = await Livro.findAndCountAll({
      where: {
        users_id: {
          [Op.ne]: req.session.user.id
        }
      },
      limit: 8,
      offset: (page - 1)*5,
      include: [ 
        'user',
        {
        model: Emprestimo,
        as: 'emprestimo'
        },
        {
          model: Doacao,
          as: 'doacao'
        }
      ]
    })
    const booksForSwap = books.filter(book => book.disponibilidade != 'doar')
    let totalPages = Math.ceil(total/8);
    res.render('listar-livros-para-troca', { title: 'Home', usuario:req.session.user, booksForSwap, totalPages});
  }
}