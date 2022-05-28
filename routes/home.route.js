const router = require('express').Router()//middleware router level


const homeController = require('../controllers/home.controller')

router.get('/', homeController.getHome/*, homeController.getHome1*/)


module.exports = router // exporter pour pouvoir l utiliser sur app.