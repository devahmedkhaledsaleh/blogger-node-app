const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const CategoryValidator = require("../middlewares/CategoryValidatorsMiddleware");

router.get("/", CategoryController.getAllCategories);
router.post("/", CategoryValidator, CategoryController.addCategory);
router.put("/:id", CategoryValidator, CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
