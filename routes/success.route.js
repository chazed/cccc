const router = require('express').Router()
 

router.get('/',(req, res,next)=>{
    res.render("success", {
        isAgence: false,
        isUser:false,
        isAdmin:false
    });
})
module.exports = router