const express = require("express");
const router = express.Router();
const roomController = require("../controllers/theatreRoom");
const isAuth = require('../middleware/is-auth');

router.post("/create", isAuth, roomController.create);

router.post("/join/:roomId", isAuth, roomController.joinRoom);

router.post("/leave/:roomId", isAuth, roomController.leaveRoom);

router.post("/set/:roomId", isAuth, roomController.setVideo);

router.get("/:roomId", roomController.getTheatreRoom);

// router.delete("/:roomId", isAuth, roomController.deleteRoom);

module.exports = router;