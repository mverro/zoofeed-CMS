const animalUserRoute = require('express').Router()
const { AnimalUserController } = require('../controllers')
const { auth } = require('../middleware/auth')

animalUserRoute.get('/', auth, AnimalUserController.get);
animalUserRoute.get('/info', auth, AnimalUserController.info);
animalUserRoute.post('/add', auth, AnimalUserController.add);
animalUserRoute.delete('/delete/:id', auth, AnimalUserController.delete)

module.exports = animalUserRoute
