const OffreModel = require("../models/Product.model");
const validationResult = require("express-validator").validationResult;


exports.getAdd = (req, res, next) => {
    res.render('Offre', {
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: true,
        isAdmin: false
    })
}

exports.postAdd = (req, res, next) => {
    console.log(validationResult(req).array())
};


exports.getOf = (req, res, next) => {
    //OffreModel.getItemsByAgence(req.session.agenceId).then(items => {
    res.render("Offre", {
        demError: req.flash("demError")[0],
        validationErrors: req.flash('validationErrors'),
        authsuccess: req.flash("authsuccess")[0],
        // items: items,
        isUser: false,
        isAgence: true,
        isAdmin: false

    })

}

/*
exports.getOffre = (req, res, next) => {
    OffreModel.getItemsByAgence(req.session.agenceId).then(items => {
        res.render("Offre", {
            demError: req.flash("demError")[0],
            validationErrors: req.flash('validationErrors'),
            authsuccess: req.flash("authsuccess")[0],
            items: items,
            isUser: false,
            isAgence: true,
            isAdmin: false

        })
    }).catch(err => console.log(err))
}

/*exports.postOffre = async (req, res, next) => {
    console.log((validationResult(req)))
    if (validationResult(req).isEmpty()) {

        OffreModel.addNewItem({
            nomOffre: req.body.nomOffre,
            destination: req.body.destination,
            voyagerDe: req.body.voyagerDe,
            depart: req.body.depart,
            nombreNuit: req.body.nombreNuit,
            nombrePersonne: req.body.nombrePersonne,
            prix: req.body.prix,
            StyleVoyage: req.body.StyleVoyage,
            TypeHebergement: req.body.TypeHebergement,
            MoyenTransport: req.body.MoyenTransport,
            description: req.body.description,
            agenceId: req.session.agenceId,
            Mois: req.body.Mois,
            Wilaya: req.body.Wilaya,
            //timestamp: Date.now()


        }).then((msg) => {
            req.flash("authsuccess", msg)

            res.redirect('/agence/Offre')
        }
        ).catch(err => {


            req.flash("demError", err),
                res.redirect('/agence/Offre')
        });
    } else {

        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)

    }



}
exports.getproducts = (req, res, next) => {
    OffreModel.getAllProducts() //prendre tt les offres de database et les afficher dans ejs 
        .then(products => {
            res.render('tombolaAdmin', {
                products: products,
                isUser: false,
                isAdmin: false,
                isAgence: false
            })
        })

}

/*exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        OffreModel.editItem(req.body.OffreId, {
            nomOffre: req.body.nomOffre,
            destination: req.body.destination,
            voyagerDe: req.body.voyagerDe,
            depart: req.body.depart,
            nombreNuit: req.body.nombreNuit,
            nombrePersonne: req.body.nombrePersonne,
            prix: req.body.prix,
            StyleVoyage: req.body.StyleVoyage,
            TypeHebergement: req.body.TypeHebergement,
            MoyenTransport: req.body.MoyenTransport,
            description: req.body.description,
            agenceId: req.session.agenceId,
            Mois: req.body.Mois,
            Wilaya: req.body.Wilaya,
            timestamp: Date.now()
        }).then(() => res.redirect("/agence/MesOffres")).catch(err => console.log(err))
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect("/agence/MesOffres");
    }
};

exports.postDelete = (req, res, next) => {
    OffreModel.deleteItem(req.body.productId).then(() => res.redirect("/agence/MesOffres")).catch(err => console.log(err))
}
*/


