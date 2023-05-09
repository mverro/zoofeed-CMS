const cartFoodRoute = require('express').Router()
const { CartFoodController } = require('../controllers')
const { auth } = require('../middleware/auth')

cartFoodRoute.get('/', CartFoodController.get);
cartFoodRoute.post('/create',auth, CartFoodController.create);
cartFoodRoute.delete('/delete/:id', CartFoodController.delete);


module.exports = cartFoodRoute