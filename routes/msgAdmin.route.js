const router = require("express").Router();
const check = require("express-validator").check;
const msgAdminController = require("../controllers/msgAdmin.controller");
const ajoutController = require("../controllers/ajout.controller");
 
const authGuard = require('./guards/admin.guard');
 
router.get("/",authGuard.authadmin,  msgAdminController.getblocrqst);
router.get("/deleteag/:id",authGuard.authadmin, ajoutController.postdeleteAg);

 
 
module.exports = router;