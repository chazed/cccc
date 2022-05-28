exports.authadmin = (req, res,next) =>{
    if (req.session.isAdmin){console.log("you are admin"),
    next()}
    else console.log("not admin") 
}