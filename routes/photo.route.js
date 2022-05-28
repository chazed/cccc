const router = require('express').Router()


router.get('/', (req, res, next) => {
    res.render("photo", {
        isAgence: true,
        isUser: false,
        isAdmin: false
    });
})


router.post('/uploadfile', upload.single('myFile', (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = newError("please upload file");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(file);
}))
module.exports = router
