const paymentRoute = require('express').Router()
const { PaymentController } = require('../controllers')
const { auth } = require('../middleware/auth')


paymentRoute.get('/', PaymentController.get);
paymentRoute.get('/user',auth, PaymentController.getbyUser);



module.exports = paymentRoute