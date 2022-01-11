const fs = require("fs");

function getRoutes() {
  const path = `${__dirname}/routes/`;

  let routes = [];

  fs.readdirSync(path).forEach((file) => {
    routes.push(require(`${path}/${file}`));
  });

  return routes;
}

module.exports = { getRoutes };
