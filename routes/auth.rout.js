const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require('express-validator').check
const authController = require("../controllers/auth.controller");
const ajoutController = require("../controllers/ajout.controller");
const authGuard = require('./guards/auth.guard')

 

router.get("/register", authGuard.notAuth, authController.getInscrire);
router.get("/register2", authGuard.notAuth, authController.getInscrire2);
router.post("/register", authGuard.notAuth,

    bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().isEmail().withMessage('email non valid'),
    check('téléphone').isNumeric().withMessage('le numéro de téléphone est invalide'),
    check('password').isLength({ min: 6 }).withMessage('le mot de passe doit comporter au moins 6 caractères'),
    check('nom').isAlpha().withMessage('le nom doit etre une chaine de caractere'),
    check('prenom').isAlpha().withMessage('le prénom doit etre une chaine de caractere'),
    authController.postInscrireClient
);

router.post("/register2",
    bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().isEmail().withMessage('email non valid'),
    check('téléphone').isNumeric().withMessage('le numéro de téléphone est invalide'),
    check('password').isLength({ min: 6 }).withMessage('le mot de passe doit comporter au moins 6 caractères'),
    check('nom').isString().withMessage('le nom doit etre une chaine de caractere'),
    check('CodePostal').isPostalCode('DZ').withMessage('code postal invalid'),
    check('registerNumber').isNumeric().withMessage('numéro de registre est invalid'),
    check('adresse').isString().withMessage('adresse non valide'),
    authController.postInscrireAgent
);
router.post("/login", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
);
router.post("/login1", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    authController.postLoginagence
);

router.get("/login", authGuard.notAuth, authController.getLogin);
router.get("/login1", authGuard.notAuth, authController.getLogin1);
router.all('/logout', authGuard.isAuth, authController.logout)
router.get("/bloquer",authGuard.isAuth,authController.postblocrqst);
router.get("/users",authGuard.isAuth,authController.getAllusers);
router.get("/agences",authGuard.isAuth,authController.getAllagences);
router.get("/users/deleteuser/:id",authGuard.isAuth,authController.postDeleteuser);
router.get("/agences/deleteagence/:id",authGuard.isAuth,ajoutController.postdeleteAg);
router.get("/update", authController.getupdateAgence)
router.post("/update",authController.postupdateAgence)
module.exports = router;//is auth si il est user s affichera pour lui //// notauth 