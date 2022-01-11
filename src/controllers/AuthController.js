const service = require("./../services/AuthService");

class AuthController {
  async login(req, res, next) {
    try {
      if (!req.body.username || !req.body.username) {
        res.status(500).json({ message: "Invalid parameters." });
      }

      const data = await service.login(req.body.username, req.body.password);

      res.status(200).json({
        auth: true,
        token: data.token,
        refreshToken: data.refreshToken,
      });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }

  async refresh(req, res, next) {
    const refreshToken = req.body.refreshToken;

    try {
      const data = await service.refresh(refreshToken);

      res.status(200).json({
        auth: true,
        token: data.token,
        refreshToken: data.refreshToken,
      });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
