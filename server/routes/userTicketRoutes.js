const userTicketRoute = require('express').Router()
const { UserTicketController } = require('../controllers')
const { auth } = require('../middleware/auth')


userTicketRoute.get('/', UserTicketController.get);
userTicketRoute.get('/user',auth, UserTicketController.getbyUser);
userTicketRoute.put('/update',auth, UserTicketController.update);


module.exports = userTicketRoute