const express = require("express");
const router = express.Router();
const videosController = require("../controllers/video");
const isAuth = require('../middleware/is-auth');
const videoUpload = require('../middleware/video');

router.post("/create", isAuth, videoUpload, videosController.postCreate);

router.get("/all", videosController.getVideos);

router.get("/:videoId", videosController.streamVideo);

module.exports = router;