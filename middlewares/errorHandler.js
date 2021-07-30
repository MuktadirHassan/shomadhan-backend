module.exports = (err, req, res, next) => {
  console.log(err);
  res
    .send(
      "Something went wrong. Contact the server administrator and have a relax. See you not for mind."
    )
    .status(503);
};
