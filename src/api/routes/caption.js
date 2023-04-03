const express = require("express");
const router = express.Router();
const captionController = require("../controllers/caption");
const captionUpload = require("../middleware/caption");
const isAuth = require("../middleware/is-auth");

router.post("/create", isAuth, captionUpload, captionController.create);

router.get("/", captionController.getByKey);

router.get("/:videoId", captionController.getCaptions);

module.exports = router;