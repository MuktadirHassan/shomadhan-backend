const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorEmail: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  likes: {
    type: Number,
    deafult: 0,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
