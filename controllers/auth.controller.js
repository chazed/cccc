const authModel = require("../models/auth.model");
const validationResult = require('express-validator').validationResult;
const { Agence } = require("../models/auth.model");
exports.getInscrire = (req, res, next) => {
    res.render("register", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false,
        isAdmin: false
    });
};
exports.getInscrire2 = (req, res, next) => {
    res.render("register2", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false,
        isAdmin: false
    });
};

exports.postInscrireClient = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createNewUser(req.body.email, req.body.password, req.body.nom, req.body.prenom, req.body.téléphone)
            .then(() => res.redirect('/login')).catch(err => {
                req.flash("authError", err),
                    res.redirect("/register");
            });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/register')
    }



};
exports.postInscrireAgent = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.createNewAgent(req.body.email, req.body.password, req.body.nom, req.body.téléphone, req.body.adresse, req.body.registerNumber, req.body.CodePostal).then(() => res.redirect('/login')).catch(err => {
            req.flash("authError", err)
            res.redirect('/register')
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/register')
    }


};

exports.getLogin = (req, res, next) => {

    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false,
        isAdmin: false
    });
};
exports.getLogin1 = (req, res, next) => {

    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false,
        isAdmin: false
    });
};

exports.postLogin = (req, res, next) => {
    authModel
        .login(req.body.email, req.body.password)
        .then(result => {
            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin;

            res.redirect("/")
        })
        .catch(err => {
            req.flash("authError", err)
            res.redirect("/login");
        });
};
exports.postLoginagence = (req, res, next) => {
    authModel
        .loginagence(req.body.email, req.body.password)
        .then((id) => {
            req.session.agenceId = id
            req.session.isAgence = true;



            res.redirect("/")
        })
        .catch(err => {
            req.flash("authError", err)

            res.redirect("/login");
        });
};




exports.logout = (req, res, next) => {
    req.session.destroy(() => {

        res.redirect('/');
    })
}


exports.postblocrqst = (req, res, next) => {
    let id = req.session.agenceId
    authModel.blocRQst(id).then(() => {

        req.session.destroy()
        res.redirect('/')

    }).catch(err => {
        req.flash("authError", err)
        console.log(err);
    });
}

exports.getupdateAgence = (req, res, next) => {
    let id = req.session.agenceId
    authModel.updateAgence(id).then((agence) => {

        res.render('update', {
            updateAgence: agence,
            authsuccess: req.flash("authsuccess")[0],
            isUser: false,
            isAgence: false,
            isAdmin: false
        })
    }).catch(err => {

        console.log(err);
    })
}

exports.getAllusers = (req, res, next) => {
    authModel.getAllusers() //prendre tt les offres de database et les afficher dans ejs 
        .then(users => {
            res.render('users', {

                users: users,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })
}

exports.getAllagences = (req, res, next) => {
    authModel.getAllagences() //prendre tt les offres de database et les afficher dans ejs 
        .then(agences => {
            res.render('agences', {
                agences: agences,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                isAgence: req.session.agenceId
            })
        })
}


exports.postDeleteuser = (req, res, next) => {
    let id = req.params.id
    authModel.deleteUser(id).then(() => {
        res.redirect('../')
    })
}
exports.postupdateAgence = (req, res, next) => {
    let id = req.session.agenceId
    authModel.postupdateAgence(id, req.body.email, req.body.password, req.body.nom, req.body.téléphone, req.body.adresse,
        req.body.registerNumber, req.body.CodePostal).then((msg) => {
            req.flash("authsuccess", msg)
            res.redirect('/update')
        }).catch((err) => {

            req.flash("authError", err)
            res.redirect('/update')
        })
}