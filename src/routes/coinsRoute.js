const express = require("express");
const router = express.Router();
const controller = require("./../controllers/coinsController");

router.get("/coins", controller.index);

module.exports = router;
