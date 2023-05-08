const foodRoute = require('express').Router();
const { FoodController } = require("../controllers");
const {upload} = require('../middleware/configUpload')
const {auth} = require('../middleware/auth')

foodRoute.get('/', FoodController.getFood)
foodRoute.post('/add',auth,upload, FoodController.add)
foodRoute.delete('/delete/:id',auth, FoodController.delete)
foodRoute.get('/detail/:id', FoodController.getFoodDetail) 
foodRoute.put('/update/:id',auth,upload, FoodController.update)
foodRoute.get('/search',FoodController.search)


module.exports = foodRoute;