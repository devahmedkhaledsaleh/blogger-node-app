const router = require("express").Router();
const PostController = require("../controllers/PostController");
const PostValidator = require("../middlewares/PostValidatorsMiddleware");

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.post("/",PostValidator, PostController.addPost);
router.put("/:id",PostValidator, PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
