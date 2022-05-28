const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_URL = "mongodb://localhost:27017/SunWay-Travel";
const adminSchema = mongoose.Schema({
   email:String,
   password :String,
   nom: String,
   prénom:String,
   téléphone: String
});

const Admin = mongoose.model("admin", adminSchema);

exports.createAdmin = (email, password,nom,prénom,téléphone) =>{

    //check if email exists
    //yes ==== email exists already
    //no ==== newAccount
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>
        {
            console.log("connected to a database");
         return Admin.findOne({email: email})  
        }).then( admin=>{
            if (admin){ 
                mongoose.disconnect()
                reject('adresse mail déjà utilisée');}
            else {
            return bcrypt.hash(password, 10)
            }
        }).then(hashPassword => {
            let admin = new Admin({
                email: email,
                password: hashPassword,
                nom: nom,
                prénom: prénom,
                téléphone: téléphone
            })
            return admin.save()
        }).then(() =>{
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
};