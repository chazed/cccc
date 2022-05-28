const productsModel = require('../models/Product.model')

exports.getHome = (req, res, next) => {

    // les middleware se font sur conrollers c pour ca et aussi pour home car dans home.router on a utilisé le '/' qui est le home de site  
    // dossier controller qui fait la laison entre view et  models
    // prendre l'offre de database et les operations de databse se trouver sur dossier models 


    /*productsModel.getAllProducts().then(products => { //prendre tt les offres de database et les afficher dans ejs 
        res.render('index', {
            products: products
        })
    })*/

    //get category 
    //if category && category!==all on filtre 
    //else render all



    /*let productsPromise
     if (StyleVoyage && StyleVoyage !== 'all') productsPromise = productsModel.getProductsByStyleVoyage(StyleVoyage)
         .then(products => {
             res.render('index', {
                 products: products,
                 isUser: req.session.userId,
                 isAgence: req.session.agenceId,
                 isAdmin: req.session.isAdmin
             })
         })
     
     else productsPromise = productsModel.getAllProducts()
     productsPromise.then(products => {
     
         res.render('index', {
             products: products,
             isUser: req.session.userId,
             isAgence: req.session.agenceId,
             isAdmin: req.session.isAdmin,
             validationError: req.flash('validationErrors')[0]
         })
     })
     
    }*/




    let StyleVoyage = req.query.StyleVoyage
    let Wilaya = req.query.Wilaya
    let Mois = req.query.Mois

    let validStyles = ['En famille', 'Entre Amis', 'Week-End', 'En Amoureux', 'Tour Du Monde', 'Rando Trek']
    let productsPromise
    if (StyleVoyage && Wilaya && Mois && StyleVoyage !== 'all' && Wilaya !== 'all' && Mois !== 'all') productsPromise = productsModel.getProductsByStyle(StyleVoyage, Wilaya, Mois)  //prendre tt les offres de database et les afficher dans ejs 

    //else if (destination && destination !== 'all') productsPromise = productsModel.getProductsBydestination(destination)


    //prendre tt les offres de database et les afficher dans ejs 





    else if (StyleVoyage && StyleVoyage !== 'all' && Wilaya == 'all' && Mois == 'all') productsPromise = productsModel.getProductsByStyleVoyage(StyleVoyage) //prendre tt les offres de database et les afficher dans ejs 











    else if (Wilaya && Wilaya !== 'all' && StyleVoyage == 'all' && Mois == 'all') productsPromise = productsModel.getProductsByWilaya(Wilaya) //prendre tt les offres de database et les afficher dans ejs 

    else if (Mois && Mois !== 'all' && StyleVoyage == 'all' && Wilaya == 'all') productsPromise = productsModel.getProductsByMois(Mois) //prendre tt les offres de database et les afficher dans ejs 

    else {
        productsPromise = productsModel.getAllProducts(StyleVoyage, Wilaya)
    }
    productsPromise.then(products => {


        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAgence: req.session.agenceId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0]
        })


    })
}
/*exports.getHome1 = (req, res, next) => {



    let destination = req.query.destination


    let productsPromise
    if (destination && destination !== 'all') productsPromise = productsModel.getProductsBydestination(destination)  //prendre tt les offres de database et les afficher dans ejs 

    else {
        console.log('lol')

        productsPromise = productsModel.getAllProducts()
        //prendre tt les offres de database et les afficher dans ejs 





    } productsPromise.then(products => {


        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAgence: req.session.agenceId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0]
        })


    })
}

*/



