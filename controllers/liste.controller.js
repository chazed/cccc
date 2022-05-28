const reserModel = require('../models/reser.model')
exports.getliste = (req, res, next) => {
    reserModel.getreser() //prendre tt les offres de database et les afficher dans ejs 

        .then(reservations => {

            res.render('listereser', {

                reservations: reservations,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })

}