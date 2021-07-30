const Article = require("../controllers/article");
const auth = require("../middlewares/auth");

const router = require("express").Router();

// Open routes
router.get("/articles", Article.get_all_articles);
router.get("/article/:articleId", Article.get_single_article);

// Secure Routes
router.post("/post-article", auth.verifyUser, Article.add_article);

module.exports = router;
