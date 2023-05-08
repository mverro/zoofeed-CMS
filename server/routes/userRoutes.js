const userRoute = require('express').Router()
const {UserController} = require("../controllers/")
const {upload} = require('../middleware/configUpload')
const {auth} = require('../middleware/auth')


userRoute.get('/', UserController.getUsers)
userRoute.post('/create', UserController.createUser)
userRoute.post('/login',UserController.login)
userRoute.put('/update/:id',auth,upload,UserController.update)
userRoute.delete('/delete/:id', UserController.delete)
userRoute.get('/account',auth,UserController.getAccount)
module.exports = userRoute
