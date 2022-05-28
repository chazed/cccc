const router = require("express").Router();
const check = require("express-validator").check;
const agencecontroller = require("../controllers/agence.controller")
const agenceGuard = require("./guards/agence.guard");
const multer = require('multer')
const bodyParser = require("body-parser");
const { response } = require("express");


router.get("/Offre", agenceGuard, /*agencecontroller.getAdd,*/ agencecontroller.getOf);
/*router.post("/Offre",
    agenceGuard, bodyParser.urlencoded({ extended: true }),
    check('nomOffre').notEmpty().withMessage("choisissez un nom pour l'offre").isString().withMessage("nom de l'offre non valide"),
    //check('StyleVoyage').notEmpty().withMessage('choisissez un style de voyage'),
    check('destination').notEmpty().withMessage('choisissez une destination').isString().withMessage('destination non valide'),
    //check('Wilaya').notEmpty().withMessage('choisissez une wilaya'),
    check('voyagerDe').notEmpty().withMessage('choisissez un lieu de depart ').isString().withMessage('lieu de depart non valide'),
    check('depart').notEmpty().isDate().withMessage('entrez une date valide'),
    //check('Mois').notEmpty().withMessage('choisissez le mois de voyage'),

    check('nombreNuit').notEmpty().withMessage("entrez le nombre de nuit").isInt({ min: 1 }).withMessage('le nombre de nuit doit etre plus grand que 0'),
    check('nombrePersonne').notEmpty().withMessage("entrez le nombre de personne").isInt({ min: 1 }).withMessage('le nombre de personne doit etre plus grand que 0'),
    // check('typeHebergement').notEmpty().withMessage('choisissez un style de voyage'),
    // check('moyenTransport').notEmpty().withMessage('choisissez un style de voyage'),
    check('prix').notEmpty().withMessage('entrez un budget').isNumeric('le budget doit etre en chiffre').isInt({ min: 1 }).withMessage('le prix doit etre plus grand que 0'),

    check('description').notEmpty().withMessage("vous n'avez pas décrit votre offre dans le champ de description"),

    /*let formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./aws";
    form.KeepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            response.json({
                result: 'failed',
                data: {},
                message: 'cannot upload is :${err}'
            });
        }
        var arrayOfFiles = files[""];
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile) => {
                fileNames.push(eachFile.path)
            });
            response.json({
                result: 'ok',
                data: fileNames,
                numberOfImages: fileNames.length,
                message: "image ajouter"
            });

        } else {
            response.json({
                result: "failed",
                data: {},
                numberOfImages: 0,
                message: "image nn ajouter"
            });

        }
    })
},

agencecontroller.postOffre);

/*router.post('/save',
    agenceGuard, bodyParser.urlencoded({ extended: true }),
    check('nomOffre').notEmpty().withMessage("choisissez un nom pour l'offre").isString().withMessage("nom de l'offre non valide"),
    check('StyleVoyage').notEmpty().withMessage('choisissez un style de voyage'),
    check('destination').notEmpty().withMessage('choisissez une destination').isString().withMessage('destination non valide'),
    check('Wilaya').notEmpty().withMessage('choisissez une wilaya'),
    check('voyagerDe').notEmpty().withMessage('choisissez un lieu de depart ').isString().withMessage('lieu de depart non valide'),
    check('depart').notEmpty().isDate().withMessage('entrez une date valide'),
    check('Mois').notEmpty().withMessage('choisissez le mois de voyage'),

    check('nombreNuit').notEmpty().withMessage("entrez le nombre de nuit").isInt({ min: 1 }).withMessage('le nombre de nuit doit etre plus grand que 0'),
    check('nombrePersonne').notEmpty().withMessage("entrez le nombre de personne").isInt({ min: 1 }).withMessage('le nombre de personne doit etre plus grand que 0'),
    check('typeHebergement').notEmpty().withMessage('choisissez un style de voyage'),
    check('moyenTransport').notEmpty().withMessage('choisissez un style de voyage'),
    check('prix').notEmpty().withMessage('entrez un budget').isNumeric('le budget doit etre en chiffre').isInt({ min: 1 }).withMessage('le prix doit etre plus grand que 0'),
    check('description').notEmpty().withMessage("vous n'avez pas décrit votre offre dans le champ de description"),

    agencecontroller.postSave);

router.post('/delete',
    agenceGuard,
    bodyParser.urlencoded({ extended: true }),
    agencecontroller.postDelete
);









*/
module.exports = router;