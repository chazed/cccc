const messageModel = require('../models/voyagecarte.model')
exports.getmessage = (req, res, next) => {
    messageModel.getdemande() //prendre tt les offres de database et les afficher dans ejs 

        .then(demandes => {

            res.render('message', {

                demandes: demandes,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })

}

