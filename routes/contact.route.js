const router = require('express').Router()


router.get('/', (req, res, next) => {
    res.render("contact", {
        isAgence: true,
        isUser: false,
        isAdmin: false
    });
})
module.exports = router