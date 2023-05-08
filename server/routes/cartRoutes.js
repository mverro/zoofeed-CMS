const cartRoute = require('express').Router()
const { CartController } = require('../controllers')
const { auth } = require('../middleware/auth')

cartRoute.get('/', CartController.getCart);
cartRoute.post('/create',auth, CartController.create);
cartRoute.delete('/delete/:id',auth, CartController.delete);
cartRoute.put('/update',auth, CartController.update);

module.exports = cartRoute