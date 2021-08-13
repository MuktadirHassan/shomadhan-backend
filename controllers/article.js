const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const ArticleModel = require("../models/ArticleModel");

module.exports.add_article = async (req, res, next) => {
  try {
    const article = new ArticleModel({
      title: req.body.title,
      authorEmail: req.body.authorEmail,
      body: req.body.body,
      authorId: req.body.authorId,
    });
    await article.save();
    res.json({
      message: "Article posted successfully",
    });
  } catch (err) {
    res.json({
      message: "Error adding articles",
      error: err.message,
    });
  }
};
module.exports.get_all_articles = async (req, res, next) => {
  try {
    res.json({
      data: res.paginatedData,
    });
  } catch (err) {
    res.json({
      message: "Error getting articles",
      error: err.message,
    });
  }
};

module.exports.get_articles_by_user = async (req, res, next) => {
  try {
    console.log(req.params.email);
    const articles = await ArticleModel.find({ authorEmail: req.params.email });
    res.json({
      data: articles,
    });
  } catch (err) {
    res.json({
      message: "Error getting articles",
      error: err.message,
    });
  }
};

module.exports.get_single_article = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({
      _id: ObjectID(req.params.articleId),
    });
    res.json({
      data: articles,
    });
  } catch (err) {
    res.json({
      message: "Error getting articles",
      error: err.message,
    });
  }
};

module.exports.update_article = async (req, res, next) => {
  try {
    const articles = await ArticleModel.updateOne(
      {
        _id: ObjectID(req.params.articleId),
      },
      {
        title: req.body.title,
        body: req.body.body,
        lastUpdated: Date.now(),
      }
    );
    if (articles.nModified > 0) {
      return res
        .json({
          articles,
          message: "Article updated successfully",
        })
        .status(200);
    }
    res.json({
      message: "No articles found with this id",
    });
  } catch (err) {
    res.json({
      message: "Error updating articles",
      error: err.message,
    });
  }
};

module.exports.delete_article = async (req, res, next) => {
  try {
    const articles = await ArticleModel.deleteOne({
      _id: ObjectID(req.params.articleId),
    });
    if (articles.deletedCount > 0) {
      return res
        .json({
          message: "Article deleted successfully",
        })
        .status(200);
    }
    res.json({
      message: "No article deleted. Wrong or no id",
    });
  } catch (err) {
    res.json({
      message: "Error deleting articles",
      error: err.message,
    });
  }
};
