const animalFoodRoute = require('express').Router();
const { AnimalFoodController} = require("../controllers")
const {auth} = require('../middleware/auth')

animalFoodRoute.get('/',auth, AnimalFoodController.getAnimalFood);

animalFoodRoute.post('/FA/add/:id',auth, AnimalFoodController.addFA);
animalFoodRoute.delete('/FA/delete/:id1/:id2',auth, AnimalFoodController.deleteFA)

animalFoodRoute.post('/AF/add/:id',auth, AnimalFoodController.addAF);
animalFoodRoute.delete('/AF/delete/:id1/:id2',auth, AnimalFoodController.deleteAF)



module.exports = animalFoodRoute;