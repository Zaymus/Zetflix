const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video");
const isAuth = require('../middleware/is-auth');
const videoUpload = require('../middleware/video');

router.post("/create", isAuth, videoUpload, videoController.postCreate);

router.get("/all", videoController.getVideos);

router.get("/:videoId", videoController.streamVideo);

router.patch("/:videoId", isAuth, videoController.patchVideo);

router.delete("/:videoId", isAuth, videoController.deleteVideo);

module.exports = router;