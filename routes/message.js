const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/contatomessageAPI", messageController.store);
router.post("/listAllMessage", messageController.read)

module.exports = router;
