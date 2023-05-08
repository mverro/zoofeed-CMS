const homeRoute = require('express').Router();
const { HomeController } = require('../controllers');

homeRoute.get('/', HomeController.showHomePage);

module.exports = homeRoute;