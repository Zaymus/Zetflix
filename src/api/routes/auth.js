const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.postLogin);

router.post("/reset", authController.passwordReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;