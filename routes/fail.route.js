const router = require('express').Router()
 

router.get('/',(req, res,next)=>{
    res.render("fail", {
        isAgence: false,
        isUser:false,
        isAdmin:false
    });
})
module.exports = router