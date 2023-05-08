const { HabitatController } = require("../controllers");
const HabitatRoute = require("express").Router();

HabitatRoute.get("/", HabitatController.getHabitat);
HabitatRoute.get("/detail/:id", HabitatController.detail);

module.exports = HabitatRoute;
