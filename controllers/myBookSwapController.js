const { Livro } = require("../models");

module.exports = {


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

    const books = await Livro.findAll({
      where: {
        disponibilidade: 'emprestar',
        users_id: req.session.user.id
      }
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