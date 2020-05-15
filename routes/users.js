const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const auth = require("../middlewares/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "images", "avatar"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.post("/registro", userController.store);
router.post("/atualizar", userController.update);
router.post("/profile", upload.any(), userController.updateProfile);
router.post("/login", authController.store);
router.post("/logout", authController.destroy);

module.exports = router;
