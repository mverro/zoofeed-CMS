const { ClassTypeController } = require('../controllers')
const classTypeRoute = require('express').Router()

classTypeRoute.get('/', ClassTypeController.getClass);
classTypeRoute.get('/detail/:id',ClassTypeController.detail)


module.exports = classTypeRoute;