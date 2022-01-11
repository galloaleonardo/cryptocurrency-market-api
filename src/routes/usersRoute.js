const express = require("express");
const router = express.Router();
const controller = require("./../controllers/UsersController");

const { authToken } = require("./../middlewares/authMiddleware");

router.get("/users", controller.index);
router.get("/users/:id", controller.find);
router.post("/users", controller.create);
router.put("/users/:id", controller.update);
router.delete("/users/:id", controller.delete);

module.exports = router;
