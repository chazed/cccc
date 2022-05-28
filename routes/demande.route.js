const router = require('express').Router()

const productController = require('../controllers/demande.controller')

//router.get('/', productController.getProduct)// la route de product 

router.get('/:id', productController.getProductById) //la route product par son id  


module.exports = router