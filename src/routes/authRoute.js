const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.post("/login", controller.login);
router.post("/refresh-token", controller.refresh);

module.exports = router;
