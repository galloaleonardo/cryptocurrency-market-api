const express = require("express");
const router = express.Router();
const controller = require("./../controllers/WalletsController");

const { authToken } = require("./../middlewares/authMiddleware");

router.get("/wallets", authToken, controller.index);
router.get("/wallets/:id", authToken, controller.find);
router.post("/wallets", authToken, controller.create);
router.put("/wallets/:id", authToken, controller.update);
router.delete("/wallets/:id", authToken, controller.delete);

module.exports = router;
