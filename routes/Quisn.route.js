
const router = require('express').Router()


router.get('/', (req, res, next) => {
    res.render("Quisommenous", {
        isAgence: false,
        isUser: false
    });
})
module.exports = router