const { default: axios } = require("axios");
const repository = require("../repositories/UserWalletCryptocoinsRepository");

class UserWalletCryptocoinsService {
  async index() {
    return await repository.index();
  }

  async find(id) {
    const data = await repository.find(id);

    return data && data.dataValues ? data.dataValues : {};
  }

  async create(data) {
    const created = await repository.create(data);

    return created && created.dataValues ? created.dataValues : {};
  }

  async update(id, data) {
    return await repository.update(id, data);
  }

  async delete(id) {
    return await repository.delete(id);
  }

  async getPriceInDollar(id) {
    const data = await repository.find(id);

    const userWalletCryptocurrency =
      data && data.dataValues ? data.dataValues : {};

    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets?search=${userWalletCryptocurrency.initials}`
      );

      const unitPriceUsd = parseFloat(response.data.data[0].priceUsd);
      const walletPriceInUsd = userWalletCryptocurrency.quantity * unitPriceUsd;

      return {
        unitPriceUsd,
        walletPriceInUsd,
      };
    } catch (error) {
      return {
        unitPriceUsd: 0,
        walletPriceInUsd: 0,
      };
    }
  }
}

module.exports = new UserWalletCryptocoinsService();
