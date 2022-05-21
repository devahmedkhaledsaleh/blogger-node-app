const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const AuthValidator = require("../middlewares/UserValidatorsMiddleware");

router.post("/register",AuthValidator,  AuthController.register);

router.post("/login", AuthValidator,AuthController.login);

module.exports = router;
