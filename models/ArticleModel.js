const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  authorEmail: String,
  body: String,
  date: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  likes: {
    type: Number,
    deafult: 0,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
