const productsModel = require('../models/Product.model')

exports.getProduct = (req, res, next) => {
    productsModel.getfirstProduct().then(product => {
        res.render('product', { //render de la page de product s appele product dans views 
            product: product, //lui passe data variable ,
            isUser: true,
            isAgence: false,
            isAdmin: false
        }
        )
    }

    )
}



exports.getProductById = (req, res, next) => {
    console.log('chaz')
    //get id
    //get product 
    //render 
    let id = req.params.id
    productsModel.getProductById(id).then((product) => {
        res.render('product', { //render de la page de product s appele product dans views 

            product: product, //lui passe data variable 
            isUser: true,
            isAgence: false,
            isAdmin: false
        }
        )
    }
    )
} 