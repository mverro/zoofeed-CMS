const orderRoute = require('express').Router()
const { OrderController } = require('../controllers')
const { auth } = require('../middleware/auth')


orderRoute.get('/', OrderController.get);
orderRoute.post('/create', OrderController.create);
orderRoute.delete('/delete/:id', OrderController.delete);


module.exports = orderRoute