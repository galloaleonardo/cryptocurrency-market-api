function index(req, res, next) {
  res.status(200).send("Controller ok!");
}

module.exports = {
  index,
};
