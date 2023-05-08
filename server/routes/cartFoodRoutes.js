const cartFoodRoute = require('express').Router()
const { CartFoodController } = require('../controllers')
const { auth } = require('../middleware/auth')

cartFoodRoute.get('/', CartFoodController.get);


module.exports = cartFoodRoute