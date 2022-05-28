
exports.getadmin = (req, res, next) => {

    res.render("/", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAgence: false,
        isAdmin: true

    })
};

