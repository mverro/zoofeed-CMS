const cartTicketRoute = require('express').Router()
const { CartTicketController } = require('../controllers')
const { auth } = require('../middleware/auth')

cartTicketRoute.get('/', CartTicketController.get);
cartTicketRoute.post('/create',auth, CartTicketController.create);
cartTicketRoute.delete('/delete/:id', CartTicketController.delete);


module.exports = cartTicketRoute