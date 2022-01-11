const service = require("../services/UsersService");

class UsersController {
  async index(req, res, next) {
    const data = await service.index(req.query);

    res.status(200).json(data);
  }

  async find(req, res, next) {
    const data = await service.find(req.params.id);

    res.status(200).json(data);
  }

  async create(req, res, next) {
    const data = req.body;
    const created = await service.create(data);

    res.status(200).json(created);
  }

  async update(req, res, next) {
    const data = req.body;
    const updated = await service.update(req.params.id, data);

    res.status(200).json(updated);
  }

  async delete(req, res, next) {
    const updated = await service.delete(req.params.id);

    res.status(200).json(updated);
  }
}

module.exports = new UsersController();
