const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video");
const isAuth = require('../middleware/is-auth');
const videoUpload = require('../middleware/video');
const thumbnailUpload = require('../middleware/thumbnail');

router.post("/create", isAuth, videoUpload, (req, res, next) => {console.log(req); next();}, videoController.postCreate);

router.get("/all", videoController.getVideos);

router.get("/data/:videoId", videoController.getVideo);

router.get("/thumbnail/:videoId", videoController.getThumbnail);

router.get("/:videoId", videoController.streamVideo);

router.patch("/:videoId", isAuth, videoController.patchVideo);

router.delete("/:videoId", isAuth, videoController.deleteVideo);

module.exports = router;