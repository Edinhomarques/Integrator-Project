var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

router.get('/quemsomos', function(req, res) {
  res.render('quemSomos');
});

router.get('/comofazerparte', function(req, res) {
  res.render('comofazerparte' );
});

router.get('/blog', function(req, res) {
  res.render('blog');
});

router.get('/postagemBlog', function(req, res) {
  res.render('postagemBlog');
});

router.get('/contato', function(req, res) {
  res.render('contato');
});

router.get('/home-logado', function(req, res) {
  res.render('home-logado');
});

router.get('/listar-meus-livros-para-doacao', function(req, res) {
  res.render('listar-meus-livros-para-doacao');
});

router.get('/listar-meus-livros-para-troca', function(req, res) {
  res.render('listar-meus-livros-para-troca');
});

router.get('/listar-livros-para-doacao', function(req, res) {
  res.render('listar-livros-para-doacao');
});

router.get('/listar-livros-para-troca', function(req, res) {
  res.render('listar-livros-para-troca');
});

router.get('/perfil', function(req, res) {
  res.render('perfil');
});

router.get('/busca', function(req, res) {
  res.render('busca');
});

router.get('/sair', function(req, res) {
  res.redirect('/');
})
module.exports = router;
