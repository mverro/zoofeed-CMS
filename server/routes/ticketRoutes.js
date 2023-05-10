const ticketRoute = require('express').Router()
const { TicketController } = require('../controllers')
const { auth } = require('../middleware/auth')

ticketRoute.get('/', TicketController.get);
ticketRoute.post('/create', TicketController.create);
ticketRoute.delete('/delete/:id', TicketController.delete);
ticketRoute.put('/updateStock', TicketController.updateStock);

module.exports = ticketRoute