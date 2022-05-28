const router = require("express").Router();
const check = require("express-validator").check;
const ajoutController = require("../controllers/ajout.controller");
const authGuard = require('./guards/admin.guard');

router.get("/",authGuard.authadmin, ajoutController.getajout);
router.get("/deleteag/:id",authGuard.authadmin, ajoutController.postdeleteAg);
router.get("/activeag/:id",authGuard.authadmin, ajoutController.postactiveAg);
 
module.exports = router;