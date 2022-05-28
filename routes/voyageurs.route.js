const router = require("express").Router();
const check = require("express-validator").check;
const voyageursController = require("../controllers/voyageurs.controller");
const authGuard = require('./guards/agence.guard');
const agenceGuard = require("./guards/agence.guard");

router.get("/", agenceGuard, voyageursController.getvoyageurs);

module.exports = router; 