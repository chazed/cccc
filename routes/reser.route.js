const router = require("express").Router();
const bodyParser = require("body-parser");

const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const resercontroller = require("../controllers/reser.controller")

router.get('/', authGuard.isAuth, resercontroller.getReser)

router.post("/",
    authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check("Nombre_Personne")
        .not()
        .isEmpty()
        .withMessage("vous n'avez pas selectionner le nombre de personne")
        .isInt({ min: 1 })
        .withMessage('le nombre de personne doit etre plus grand que 0'),
    resercontroller.postReser);

router.post('/save', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check("Nombre_Personne")
        .not()
        .isEmpty()
        .withMessage("vous n'avez pas selectionner le nombre de personne")
        .isInt({ min: 1 })
        .withMessage('le nombre de personne doit etre plus grand que 0'),
    resercontroller.postSave);

router.post('/delete',
    authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    resercontroller.postDelete
);

module.exports = router;