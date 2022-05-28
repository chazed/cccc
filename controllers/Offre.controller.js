const OffreModel = require("../models/Product.model");
const validationResult = require("express-validator").validationResult;



const express = require("express");
const app = express()


/*const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/SunWay-Travel',
    collection: 'sessions'
})
app.use(session({
    secret: "c'est mon premier projet en dev web",
    saveUninitialized: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    store: STORE
}))*/




exports.getOffre = (req, res, next) => {
    OffreModel.getItemsByAgence(req.session.agenceId).then(items => {
        res.render("MesOffres", {
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

exports.postOffre = async (req, res, next) => {
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
            timestamp: Date.now(),
            photoUrl1: "",
            photoUrl2: "",
            photoUrl3: "",
            photoUrl4: "",
            photoUrl5: "",
            photoUrl6: "",
            photoUrl7: "",


        }).then((msg) => {
            req.flash("authsuccess", msg)

            res.redirect('/test')
        }
        ).catch(err => {


            req.flash("demError", err),
                res.redirect('/test')
        });
    } else {

        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/agence/Offre')

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

exports.postSave = (req, res, next) => {

    if (validationResult(req).isEmpty()) {
        OffreModel.editItem(req.body.productId, {
            nomOffre: req.body.nomOffre,
            /*destination: req.body.destination,
            voyagerDe: req.body.voyagerDe,
            depart: req.body.depart,
            nombreNuit: req.body.nombreNuit,
            nombrePersonne: req.body.nombrePersonne,*/
            prix: req.body.prix,
            /* StyleVoyage: req.body.StyleVoyage,
             TypeHebergement: req.body.TypeHebergement,
             MoyenTransport: req.body.MoyenTransport,
             description: req.body.description,
             agenceId: req.session.agenceId,
             Mois: req.body.Mois,
             Wilaya: req.body.Wilaya,*/
            timestamp: Date.now()
        }).then(() => res.redirect("/MesOffres")).catch(err => console.log(err))
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect("/MesOffres");
    }
};

exports.postDelete = (req, res, next) => {
    OffreModel.deleteItem(req.body.productId).then(() => res.redirect("/MesOffres")).catch(err => console.log(err))
}



