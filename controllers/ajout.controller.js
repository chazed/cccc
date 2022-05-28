const userModel = require('../models/auth.model')
const { User } = require('../models/auth.model')
const { Agence } = require('../models/auth.model')
exports.getajout = (req, res, next) => {
    userModel.getAllrequests() //prendre tt les offres de database et les afficher dans ejs 

        .then(agences => {

            res.render('ajout', {

                agences: agences,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })

}
exports.postdeleteAg = (req, res, next) => {
    let id = req.params.id
    userModel.deleteagence(id).then(() => {
        res.redirect('../')

    })
}

exports.postactiveAg = (req, res, next) => {
    let id = req.params.id
    userModel.activeagence(id).then(() => {
        console.log('opération réussie')
        res.redirect('../../')
    }).catch(err => {

        console.log(err);
    });
}
