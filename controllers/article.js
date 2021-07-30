const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const ArticleModel = require("../models/ArticleModel");

module.exports.add_article = async (req, res, next) => {
  try {
    const article = new ArticleModel({
      title: req.body.title,
      authorEmail: req.body.authorEmail,
      body: req.body.content,
      date: req.body.date,
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
    const articles = await ArticleModel.find({});
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

// Need more robust logic
module.exports.update_article = async (req, res, next) => {
  try {
    const articles = await ArticleModel.updateOne(
      {
        _id: ObjectID(req.params.articleId),
      },
      {
        title: req.body.title,
        body: req.body.body,
      }
    );
    res
      .json({
        message: "Article deleted successfully",
      })
      .status(200);
  } catch (err) {
    res.json({
      message: "Error getting articles",
      error: err.message,
    });
  }
};

module.exports.delete_article = async (req, res, next) => {
  try {
    const articles = await ArticleModel.deleteOne({
      _id: ObjectID(req.params.articleId),
    });
    res
      .json({
        message: "Article deleted successfully",
      })
      .status(200);
  } catch (err) {
    res.json({
      message: "Error getting articles",
      error: err.message,
    });
  }
};
