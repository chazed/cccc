const voyageModel = require('../models/voyagecarte.model')



const validationResult = require('express-validator').validationResult;
const express = require("express");
const app = express()




/*exports.getVyge = (req, res, next) => {

    res.render("voyagecarte", {
        demError: req.flash("demError")[0],
        validationErrors: req.flash('validationErrors'),
        authsuccess: req.flash("authsuccess")[0],
        // items: items,
        isUser: true,
        isAgence: false,
        isAdmin: false

    })

}

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



exports.getVoyage = (req, res, next) => {
    voyageModel.getItemsByUser(req.session.userId).then(items => {
        res.render("MesVoyages", {
            demError: req.flash("demError")[0],
            validationErrors: req.flash('validationErrors'),
            items: items,
            isUser: true,
            isAgence: false,
            isAdmin: false

        })
    }).catch(err => console.log(err))
}

exports.postVoyage = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {

        voyageModel.addNewItem({
            StyleVoyage: req.body.StyleVoyage,
            lieu: req.body.lieu,
            destination: req.body.destination,
            depart: req.body.depart,
            retour: req.body.retour,
            adulte: req.body.adulte,
            enfant: req.body.enfant,
            nombrechambre: req.body.nombrechambre,

            MoyenTransport: req.body.MoyenTransport,
            budjet: req.body.budjet,
            description: req.body.description,
            userId: req.session.userId
        }).then(() => {
            res.redirect('/MesVoyages')
        }
        ).catch(err => {
            req.flash("demError", err),
                res.redirect('/MesVoyages')
        });
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/creerVoyage')
    }



}