const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const auth = require("../middlewares/auth");

const bookController = require("../controllers/bookController")
const myBookSwapController = require("../controllers/myBookSwapController")
const myBookDonationController = require("../controllers/myBookDonationController")
/** Controler para exibir Livros de Outros ususario */

const storageBook = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "images", "img-livros"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const uploaBook = multer({ storage: storageBook });


router.post("/book", uploaBook.any(), bookController.create )

/**Meus Livros para doacao */
router.get('/listar-meus-livros-para-doacao', auth, myBookDonationController.listBookForDonation)
router.post("/listar-meus-livros-para-doacao", myBookDonationController.updateBook )
router.delete('/listar-meus-livros-para-doacao/:id', auth, myBookDonationController.delete)

/**Meus Livros para troca */
router.get('/listar-meus-livros-para-troca', auth, myBookSwapController.listBookForExchange)
router.post('/listar-meus-livros-para-troca', auth, myBookSwapController.updateBook)
router.delete('/listar-meus-livros-para-troca/:id', auth, myBookSwapController.delete)

/* Livros de outros usuarios */
router.get('/listar-livros-para-doacao', auth, bookController.listBooksForDonation);


/* Livros de outros usuarios */
router.get('/listar-livros-para-troca', auth, bookController.listBookForSwap);



module.exports = router;
