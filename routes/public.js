const Article = require("../controllers/article");

const router = require("express").Router();

router.get("/articles", Article.get_all_articles);
router.get("/article/:articleId", Article.get_single_article);

module.exports = router;
