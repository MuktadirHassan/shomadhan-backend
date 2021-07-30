const Article = require("../controllers/article");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.delete(
  "/delete-article/:articleId",
  auth.verifyAdmin,
  Article.delete_article
);

module.exports = router;
