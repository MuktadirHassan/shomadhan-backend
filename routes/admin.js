const articleController = require("../controllers/article");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.delete(
  "/delete-article/:articleId",
  auth.verifyAdmin,
  articleController.delete_article
);

module.exports = router;
