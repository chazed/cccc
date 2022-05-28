const router = require("express").Router();
const check = require("express-validator").check;
const listeController = require("../controllers/liste.controller");
const authGuard = require('./guards/admin.guard');

router.get("/", authGuard.authadmin, listeController.getliste);

module.exports = router;