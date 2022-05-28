module.exports = (req, res, next) => {
    if (req.session.isAgence) next()
    else console.log('not agence')
};
exports.notAuth = (req, res, next) => {
    if (!req.session.agenceId) next() //si il n est pas user do next 
    else res.redirect("/");//si il est user on l envoie au / slash
};
