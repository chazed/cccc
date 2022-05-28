const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const tomboController = require("../controllers/tombola.controller");
const agencecontroller = require("../controllers/agence.controller");
const authGuard = require('./guards/admin.guard');
router.get('/tombolaAdmin', authGuard.authadmin, agencecontroller.getproducts)
router.get('/', authGuard.authadmin, tomboController.getTombolaAdmin)
router.get('/ajoutombo/:id', authGuard.authadmin, tomboController.postAjouTombola)
router.get('/choisirGa/:id', authGuard.authadmin, tomboController.postchoisirGan)
router.get('/deletetombo/:id', authGuard.authadmin, tomboController.deletetombo)
//router.post("/tombola",authGuard.isAuth, tomboController.postTombola)

module.exports = router;