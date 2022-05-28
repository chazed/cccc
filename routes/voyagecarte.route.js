const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const voyageController = require("../controllers/voyagecarte.controller");

const authGuard = require('./guards/auth.guard');






router.get('/', authGuard.isAuth, voyageController.getVyge)

/*router.post("/voyagecarte",
    authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check('StyleVoyage').notEmpty().withMessage('choisissez un style de voyage'),
    check('lieu').notEmpty().withMessage('choisissez un lieu de départ').isString().withMessage('destination non valide'),
    check('destination').notEmpty().withMessage('choisissez une destination').isString().withMessage('destination non valide'),
    check('depart').notEmpty().isDate().withMessage('entrez une date valide'),
    check('retour').notEmpty().isDate().withMessage('entrez une date valide'),
    check('adulte').notEmpty().withMessage("entrez le nombre d'adulte"),
    check('enfant').notEmpty().withMessage("entrez le nombre d'enfant"),
    check('nombrechambre').notEmpty().withMessage('entrez le nombre de chambres à réserver'),
    check('budjet').notEmpty().withMessage('entrez un budget').isNumeric('le budget doit etre en chiffre'),
    check('description').notEmpty().withMessage("vous n'avez pas décrit votre voyage dans le champ de description"),
    voyageController.postVoyage

);*/
module.exports = router
