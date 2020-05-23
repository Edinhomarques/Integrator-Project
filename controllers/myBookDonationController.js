const { Livro } = require("../models");
module.exports = {

  async listBookForDonation (req, res) {
    const books = await Livro.findAll({
      where: {
        disponibilidade: 'doar',
        users_id: req.session.user.id
      }
    })
    res.render('listar-meus-livros-para-doacao', {usuario:req.session.user, books})
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
    res.redirect('/listar-meus-livros-para-doacao')
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

    return res.redirect('/listar-meus-livros-para-doacao')
  }
}