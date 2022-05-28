demandeModel = require('../models/voyagecarte.model')

exports.getProductById = (req, res, next) => {
    console.log('chaz')
    //get id
    //get product 
    //render 
    let id = req.params.id
    demandeModel.getProductById(id).then((demande) => {
        res.render('Voyagecarte', { //render de la page de product s appele product dans views 

            demande: demande, //lui passe data variable 
            isUser: true,
            isAgence: false,
            isAdmin: false
        }
        )
    }
    )
} 