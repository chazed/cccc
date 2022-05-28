const reserModel = require('../models/reser.model')
exports.getvoyageurs = (req, res, next) => {
    reserModel.getliste() //prendre tt les offres de database et les afficher dans ejs 

        .then(reservations => {

            res.render('voyageurs', {

                reservations: reservations,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })

} 