const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const repository = require("./../repositories/RefreshTokensRepository");
const userService = require("./../services/UsersService");
const bcrypt = require("bcrypt");

class AuthService {
  async login(username, password) {
    const data = await userService.index({ username: username });

    const user =
      data && data[0] && data[0].dataValues ? data[0].dataValues : null;

    if (!user) throw new Error("Incorrect or non-existent username/password.");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      throw new Error("Incorrect or non-existent username/password.");

    const id = user.id;

    const token = this._generateToken(id);
    const refreshToken = await this._generateRefreshToken(id);

    return { token, refreshToken };
  }

  async refresh(currentRefreshToken) {
    if (!currentRefreshToken) throw new Error("No token provided.");

    const response = await repository.find(currentRefreshToken);

    const data = response && response.dataValues ? response.dataValues : {};

    if (!data) throw new Error("Invalid token.");

    const token = data.refresh_token;

    let id = 0;

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err instanceof TokenExpiredError)
        throw new Error("Unauthorized! Access Token was expired!");

      if (err) throw new Error("Failed to authenticate token.");

      id = user.id;
    });

    const newToken = this._generateToken(id);
    const newRefreshToken = await this._generateRefreshToken(id);

    return { token: newToken, refreshToken: newRefreshToken };
  }

  _generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 300,
    });
  }

  async _generateRefreshToken(id) {
    const refreshToken = jwt.sign(
      { id },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    await this._persistRefreshToken(id, refreshToken);

    return refreshToken;
  }

  async _persistRefreshToken(id, refreshToken) {
    await repository.delete(id).then(() => {
      repository.create({
        user_id: id,
        refresh_token: refreshToken,
      });
    });
  }
}

module.exports = new AuthService();
