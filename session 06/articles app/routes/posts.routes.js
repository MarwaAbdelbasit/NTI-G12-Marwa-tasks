const router = require("express").Router();
const postsController = require("../controller/posts.controller");

router.get("/", postsController.home);
router.get("/addPost", postsController.addPost);
router.post("/addPost", postsController.addPostLogic);
router.get("/editPost/:id", postsController.editPost);
router.post("/editPost/:id", postsController.editPostLogic);
router.get("/showPost/:id", postsController.showPost);
router.get("/delPost/:id", postsController.delPost);
router.get("/deleteAll", postsController.deleteAll);

module.exports = router