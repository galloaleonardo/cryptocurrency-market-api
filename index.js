const { getRoutes } = require("./src/helpers");
const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use("/", getRoutes());

app.listen(9900);
