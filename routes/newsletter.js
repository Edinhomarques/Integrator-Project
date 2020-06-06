const express = require('express');
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");

router.post("/newsletterAPI", newsletterController.store);
router.post('/listAllNews', newsletterController.read)

module.exports = router;
