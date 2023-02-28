const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating");

router.post("/:videoId", ratingController.create);

router.get("/:videoId", ratingController.getAverage);

module.exports = router;