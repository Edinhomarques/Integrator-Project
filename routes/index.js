const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { Livro, Emprestimo, Doacao } = require("../models");

const auth = require("../middlewares/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', usuario:req.session.user});
});
router.get('/quemsomos', function(req, res, next) {
  res.render('quemsomos', { title: 'Quem Somos', usuario:req.session.user});
});
router.get('/comofazerparte', function(req, res, next) {
  res.render('comofazerparte', { title: 'Como Fazer Parte', usuario:req.session.user});
});
router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Blog', usuario:req.session.user});
});
router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'Blog', usuario:req.session.user});
});

router.get('/home-logado', auth,  async function(req, res, next) {
  const books = await Livro.findAll({
    where: {
      users_id: {
        [Op.ne]: req.session.user.id
      }
    },
    include: [ 
      'user',
      {
        model: Doacao,
        as: 'doacao'
      },
      {
        model: Emprestimo,
        as: 'emprestimo'
      }]
  })
  const booksForDonation = books.filter(book => book.disponibilidade != 'emprestar') 
  const booksForSwap = books.filter(book => book.disponibilidade != 'doar') 
  res.render('home-logado', { title: 'Home', usuario:req.session.user, booksForDonation, booksForSwap});
});

// router.get('/listar-meus-livros-para-troca', auth, function(req, res, next) {
//   res.render('listar-meus-livros-para-troca', { title: 'Meus Livros para doação' , usuario:req.session.user});
// });
router.get('/perfil', auth, function(req, res, next) {
  res.render('perfil', { title: 'Perfil' , usuario:req.session.user});
});
router.get('/busca', auth, function(req, res, next) {
  res.render('busca', { title: 'Contato', usuario:req.session.user});
});


module.exports = router;