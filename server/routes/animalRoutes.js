const animalRoute = require("express").Router();
const { AnimalController } = require("../controllers");
const {upload} = require('../middleware/configUpload')
const {auth} = require('../middleware/auth')

animalRoute.get("/", AnimalController.getAnimal);
animalRoute.post("/add",auth,upload, AnimalController.add);
animalRoute.delete("/delete/:id",auth, AnimalController.delete);
animalRoute.get("/detail/:id", AnimalController.getAnimalDetail);
animalRoute.put("/update/:id",auth,upload, AnimalController.update);
animalRoute.get("/keeper/:id",AnimalController.findKeeper);
animalRoute.get("/search",AnimalController.search);

module.exports = animalRoute;
