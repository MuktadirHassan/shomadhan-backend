module.exports = function paginatedResult(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = {};

    if (endIndex < (await model.countDocuments())) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      data.articles = await model.find().limit(limit).skip(startIndex);
      res.paginatedData = data;
      next();
    } catch (err) {
      res.json({
        message: "Error getting paginated articles.",
        error: err.message,
        code: "#009",
      });
    }
  };
};
