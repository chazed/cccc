exports.isAuth = (req, res, next) => {
    if (req.session.userId) next()
    //si  y en a userId utilise le middleware apres cela de homecontroller 
    else {
        if (req.session.agenceId) next()
        else
            res.redirect("/login")
    } //sinon le redircter au login 
};

/*exports.isAuth = (req, res, next) => {
    if (req.session.agenceId) next() //si  y en a userId utilise le middleware apres cela de homecontroller 
    else res.redirect("/login") //sinon le redircter au login 
};*/

exports.notAuth = (req, res, next) => {
    if (!req.session.userId) next() //si il n est pas user do next 
    else {
        if (!req.session.agenceId) next()
        else res.redirect("/");
    }//si il est user on l envoie au / slash
};

exports.notAuth = (req, res, next) => {
    if (!req.session.agenceId) next() //si il n est pas user do next 
    else res.redirect("/");//si il est user on l envoie au / slash
};
