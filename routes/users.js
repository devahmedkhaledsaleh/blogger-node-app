const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UserValidator = require("../middlewares/UserValidatorsMiddleware");

router.get("/:id", UserController.getUserById);
router.patch("/:id", UserValidator, UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
