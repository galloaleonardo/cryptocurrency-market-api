const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Access Token was expired!" });
    }

    if (err)
      return res
        .status(401)
        .json({ auth: false, message: "Failed to authenticate token." });

    req.user = user;

    next();
  });
}

module.exports = { authToken };
