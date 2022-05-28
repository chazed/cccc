const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const tomboController = require("../controllers/tombola.controller");

const authGuard = require('./guards/auth.guard');
router.get('/tombola',authGuard.isAuth,tomboController.getTombola)
router.get('/tombola/participer/:id',authGuard.isAuth, tomboController.getparticiper)
router.get('/tombola/getgagnant/:id',authGuard.isAuth,tomboController.postchoisirGa)
//router.get('/tombolaAdmin',tomboController.getTombola)
//router.post("/tombola",authGuard.isAuth, tomboController.postTombola)

module.exports = router;
