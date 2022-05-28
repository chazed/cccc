const tomboModel = require('../models/tombola.model')

const authmodel = require('../models/auth.model')
const productsModel = require('../models/Product.model')

exports.getTombola = (req, res, next) => {
    tomboModel.getAlltombola() //prendre tt les offres de database et les afficher dans ejs 
        .then(tombolas => {
            res.render('tombola', {
                tombolas: tombolas,
                participsuccess: req.flash("participsuccess")[0],
                authsuccess: req.flash("authsuccess")[0],
                isUser: true,
                isAdmin: false,
                isAgence: false
            })
        })
}



exports.getTombolaAdmin = (req, res, next) => {
    tomboModel.getAlltombola() //prendre tt les offres de database et les afficher dans ejs 
        .then(tombolas => {
            productsModel.getAllProducts().then(products => {
                res.render('tombolaAdmin', {
                    authsuccess: req.flash("authsuccess")[0],
                    autherror: req.flash("autherror")[0],
                    tombolas: tombolas,
                    products: products,
                    isUser: false,
                    isAdmin: true,
                    isAgence: false
                })
            })
        })
}



exports.postAjouTombola = (req, res, next) => {
    let id = req.params.id
    productsModel.getProductById(id).then((product) => {
        tomboModel.addNewTombola(product.nomOffre, product.StyleVoyage, /*product.image*/[], null, product.destination, product.depart, product.nombreNuit, product.Wilaya, product.description).then(() => {
            res.redirect('/tombolaAdmin')
        }).catch((err) => {
            console.log(err)
            res.redirect('/tombolaAdmin')
        })
    })
}

exports.getparticiper = (req, res, next) => {
    let id = req.params.id
    let id2 = req.session.userId
    tomboModel.participer(id, id2).then((msg) => {
        req.flash("participsuccess", msg)
        res.redirect('/tombola')
    }).catch(err => {
        res.redirect('/tombola')
    })

}

exports.postchoisirGan = (req, res, next) => {
    let id = req.params.id
    tomboModel.getwinner(id).then((tombola) => {
        var winner = tombola.participants;
        var randomitem = winner[Math.floor(Math.random() * winner.length)]
        console.log(randomitem)
        authmodel.getuserbyId(randomitem.id).then(user => {
            req.flash("authsuccess", user.nom, " " + " ", user.prenom)
            res.redirect('/tombolaAdmin')
            tomboModel.updatetombola(user._id, id)
        })
    })
}

exports.deletetombo = (req, res, next) => {
    let id = req.params.id
    tomboModel.deletetombo(id).then(() => {
        res.redirect('/tombolaAdmin')
    })
}



exports.postchoisirGa = (req, res, next) => {
    let id = req.params.id
    let userid = req.session.userId

    tomboModel.affichergagnant(id, userid).then(msg => {
        req.flash("authsuccess", msg)
        res.redirect('/tombola')
    })
        .catch(() => {
            res.redirect("/tombola");
        });
}