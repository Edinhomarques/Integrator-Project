const { Livro, Doacao } = require("../models");
module.exports = {

  async listBookForDonation (req, res) {
    const { page=1 }= req.query;
    const {count: total, rows: books} = await Livro.findAndCountAll({
      where: {
        disponibilidade: 'doar',
        users_id: req.session.user.id
      },
      limit: 8,
      offset: (page - 1)*5,
      include: [{
        model: Doacao,
        as: 'doacao'
      }]
    })
    let totalPages = Math.ceil(total/8);
    res.render('listar-meus-livros-para-doacao', {usuario:req.session.user, books, totalPages})
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

  async donateBook (req, res) {
    const { idBook} = req.body
      console.log(idBook)
      await Doacao.create({
        livros_id: idBook,
        data_doacao:new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
  
    res.redirect('listar-meus-livros-para-doacao')

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