const authModel = require('../models/auth.model')
const {Agence} = require('../models/auth.model')
exports.getblocrqst = (req, res, next) => {
    authModel.getblocrqst() .then(agences => {

        res.render('msgAdmin', {
           
            agences: agences,
            isUser: false,
            isAgence: false,
            isAdmin: false
        })
    })
   
}
