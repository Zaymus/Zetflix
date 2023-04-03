const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const isAuth = require('../middleware/is-auth');

router.post("/:videoId", isAuth, commentController.create);

router.get("/replies/:commentId", commentController.getReplies);

router.post("/rate/:commentId", commentController.postRateComment);

router.get("/:videoId", commentController.getComments);

module.exports = router;