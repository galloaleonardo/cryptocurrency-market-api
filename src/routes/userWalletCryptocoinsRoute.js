const express = require("express");
const router = express.Router();
const controller = require("./../controllers/UserWalletCryptocoinsController");

const { authToken } = require("./../middlewares/authMiddleware");

router.get("/user-wallet-cryptocoins", authToken, controller.index);
router.get("/user-wallet-cryptocoins/:id", authToken, controller.find);
router.get("/user-wallet-cryptocoins/:id/price", authToken, controller.price);
router.post("/user-wallet-cryptocoins", authToken, controller.create);
router.put("/user-wallet-cryptocoins/:id", authToken, controller.update);
router.delete("/user-wallet-cryptocoins/:id", authToken, controller.delete);

module.exports = router;
