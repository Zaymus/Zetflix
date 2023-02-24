const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");
const isAuth = require('../middleware/is-auth');

router.post("/create", usersController.postCreate);

router.patch("/update", isAuth, usersController.patchUpdate);

router.delete("/delete", isAuth, usersController.deleteUser);

router.patch("/avatar", isAuth, usersController.patchAvatar);

router.get("/:userId/avatar", usersController.getAvatar);

router.get("/:userId", usersController.getById);

module.exports = router;