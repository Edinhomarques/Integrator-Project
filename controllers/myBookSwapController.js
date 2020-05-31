const { Livro, Emprestimo } = require("../models");

module.exports = {


  async listBookForExchange (req, res) {
    const books = await Livro.findAll({
      where: {
        disponibilidade: 'emprestar',
        users_id: req.session.user.id
      },
      include: [{
        model: Emprestimo,
        as: 'emprestimo'
      }]
    })
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

    const books = await Livro.findAll({
      where: {
        disponibilidade: 'emprestar',
        users_id: req.session.user.id
      }
    })
    res.redirect('listar-meus-livros-para-troca')
  },

  async lentBook (req, res) {
    const { idBook} = req.body

    try{
      await Emprestimo.create({
        livros_id: idBook,
        data_emprestimo:new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch{
      await Emprestimo.update({
        data_devolucao:null,
        data_emprestimo:new Date(),
      },{
        where: {livros_id: idBook }
      })
    }
    
    res.redirect('listar-meus-livros-para-troca')

  },

  async returnBook (req, res) {
    const { idBook} = req.body

    await Emprestimo.update({
      data_devolucao:new Date(),
    },{
      where: {id: idBook }
    })
    res.redirect('listar-meus-livros-para-troca')
      
  },

  async delete(req, res){
    try {
      const { id } = req.params;

      await Livro.destroy({
        where: {id: id}
      })
    } catch (error) {
      console.log(error)
    }

    return res.redirect('/listar-meus-livros-para-troca')
  }
}