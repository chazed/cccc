const router = require("express").Router();
const check = require("express-validator").check;
const messageController = require("../controllers/message.controller");
const authGuard = require('./guards/agence.guard');
const agenceGuard = require("./guards/agence.guard");
const bodyParser = require("body-parser");

router.get("/", agenceGuard, messageController.getmessage);


module.exports = router;