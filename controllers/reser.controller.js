const reserModel = require("../models/reser.model")

const validationResult = require('express-validator').validationResult;
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




exports.getReser = (req, res, next) => {
    reserModel.getItemsByUser(req.session.userId).then(items => {
        res.render("reser", {
            items: items,
            isUser: true,
            isAgence: false,
            isAdmin: false
        })
    }).catch(err => console.log(err))
}


exports.postReser = async (req, res, next) => {

    if (validationResult(req).isEmpty()) {


        reserModel.addNewItem({

            nomOffre: req.body.nomOffre,
            prix: req.body.prix,
            Nombre_Personne: req.body.Nombre_Personne,
            Nombre_enfants: req.body.Nombre_enfants,
            Nombre_bebe: req.body.Nombre_bebe,
            userId: req.session.userId,









            agenceId: req.body.agenceId,


            productId: req.body.productId,

            timestamp: Date.now()

        }).then(() => {

            res.redirect('/reser')
        }
        ).catch(err => {

            console.log(err)
        })


    } else {

        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)

    }

}

exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {

        reserModel.editItem(req.body.reserId, {
            Nombre_Personne: req.body.Nombre_Personne,
            Nombre_enfants: req.body.Nombre_enfants,
            Nombre_bebe: req.body.Nombre_bebebebe,
            //timestamp: Date.now()
        }).then(() => res.redirect("/reser")).catch(err => console.log(err))
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect("/reser");
    }
};

exports.postDelete = (req, res, next) => {
    reserModel.deleteItem(req.body.reserId).then(() => res.redirect("/reser")).catch(err => console.log(err))
}


