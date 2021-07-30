const articleController = require("../controllers/article");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = require("express").Router();

// login and register
router.post("/register", userController.register);
router.post("/login", userController.login);

// Open routes
router.get("/articles", articleController.get_all_articles);
router.get("/article/:articleId", articleController.get_single_article);

// Secure Routes
router.post("/post-article", auth.verifyUser, articleController.add_article);
router.patch(
  "/update-article/:uid/:articleId",
  auth.verifyCurrentUser,
  articleController.update_article
);
router.delete(
  "/delete-article/:uid/:articleId",
  auth.verifyCurrentUser,
  articleController.delete_article
);

module.exports = router;
