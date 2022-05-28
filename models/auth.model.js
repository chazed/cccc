const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { reject } = require("bcrypt/promises");
const { string, number } = require("joi");


const DB_URL = "mongodb://localhost:27017/SunWay-Travel";

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    nom: String,
    prenom: String,
    téléphone: String,
    tauxReduction: {
        type:Number,
    default:0
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
});
const agenceSchema = mongoose.Schema({
    email: String,
    password: String,
    nom: String,
    téléphone: Number,
    adresse: String,
    registerNumber:Number,
    CodePostal:Number,
    activ: {
        type: Boolean,
        default: false
    },
    blocRqst: {
        type:Boolean,
        default:false
    }
 });
 
 
const Agence = mongoose.model("agence", agenceSchema)
const User = mongoose.model("user", userSchema);

module.User = { User };
module.Agence = {Agence};
 
 
 
 

 

 
 
const createNewUser = (email, password,nom,prenom,téléphone) =>{

    //check if email exists
    //yes ==== email exists already
    //no ==== newAccount
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>
        {
            console.log("connected to a database");
         return User.findOne({email: email})  
        }).then(user =>{
            if (user){ 
                mongoose.disconnect()
                reject('adresse mail déjà utilisée');}
            else {
            return bcrypt.hash(password, 10)
            }
        }).then(hashPassword => {
            let user = new User({
                email: email,
                password: hashPassword,
                nom: nom,
                prenom: prenom,
                téléphone: téléphone,
                tauxReduction:0,
                isAdmin: false
            })
            return user.save()
        }).then(() =>{
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
};

const createNewAgent = (email, password,nom,téléphone, adresse, registerNumber, CodePostal) =>{

    //check if email exists
    //yes ==== email exists already
    //no ==== newAccount
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>
        {
            console.log("connected to a database");
         return Agence.findOne({email: email})  
        }).then(agence =>{
            if (agence){ 
                mongoose.disconnect()
            reject('adresse mail déjà utilisée');}
            else {
            return bcrypt.hash(password, 10)
            }
        }).then(hashPassword => {
            let agence = new Agence({
                email: email,
                password: hashPassword,
                nom: nom,
                téléphone: téléphone,
                adresse: adresse,
                registerNumber:registerNumber,
                CodePostal:CodePostal,
                activ: false,
                blocRqst:false
            })
            return agence.save()
        }).then(() =>{
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
};


const login = (email, password) => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL).then(() => 
            
            User.findOne({email: email})).then(user => {
           if (!user){
                mongoose.disconnect()
                reject('aucun utilisateur avec cette adresse email')
            } else{ 
                
                 bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect()
                        reject('mot de passe incorrect')
                    } else {
                            mongoose.disconnect()
                            resolve({ 
                                id: user._id,
                                isAdmin: user.isAdmin
                            })
                    }
                });
            }
        }).catch(err =>{
            mongoose.disconnect();
            reject(err)
        })
    });

};
const loginagence = (email, password) => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL).then(() => 
            
            Agence.findOne({email: email})).then(agence => {
           if (!agence){
                mongoose.disconnect()
                reject('aucun utilisateur avec cette adresse email')
            } else {
                
                     if(agence.activ==false){
                         mongoose.disconnect()
                         reject("vous n'etes pas encore autorisé à vous connecter")
                     }
                     else{
                 bcrypt.compare(password, agence.password).then(same => {
                    if (!same) {
                        mongoose.disconnect()
                        reject('mot de passe incorrect')
                    } else {
                            mongoose.disconnect()
                            resolve(agence._id)
                    }
                
                });
            }
            
            }
        }).catch(err =>{
            mongoose.disconnect();
            reject(err)
        })
    });

};
 

 
const getblocrqst = ()=>
{  
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
    mongoose.connect(DB_URL).then(() => {
        return Agence.find({blocRqst:true})
    }).then(agences => {
        mongoose.disconnect()
        resolve(agences)
    }).catch(err => reject(err)) //en cas d erreur on la rejecte
})
}
    

 

const getAllrequests = () => {
    //connexion database
    //get les produits


    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Agence.find({})
        }).then(agences => {
            mongoose.disconnect()
            resolve(agences)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })

}

const getAllusers = () => {
    //connexion database
    //get les produits
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return User.find({})
        }).then(users => {
            mongoose.disconnect()
            resolve(users)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })
}

const getAllagences = () => {
    //connexion database
    //get les produits
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Agence.find({activ:true},{blocRqst:false})
        }).then(agences => {
            mongoose.disconnect()
            resolve(agences)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })
}

const deleteagence=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Agence.deleteOne({_id:id})
        }).then(agences=>{
            mongoose.disconnect()
            resolve(agences)
        }).catch(err=>reject(err));
    });
};


const deleteUser=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.deleteOne({_id:id})
        }).then(users=>{
            mongoose.disconnect()
            resolve(users)
        }).catch(err=>reject(err));
    });
};
    
const activeagence=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Agence.updateOne({_id:id},{activ:true} )
        }).then(agences=>{
            
            mongoose.disconnect()
            resolve(agences)
        }).catch(err=>reject(err));
    });
};
const blocRQst=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Agence.updateOne({_id:id},{blocRqst:true})
        }).then(agences=>{
            
            mongoose.disconnect()
            resolve(agences)
        }).catch(err=>reject(err));
    });
};
const updateAgence=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
        return Agence.findById(id)
    }).then(agences=>{
        mongoose.disconnect()
        resolve(agences)
    }).catch(err=>reject(err) )
}) 
}

const getuserbyId = (id) => { //prend l id et recherche le produit 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findById(id); // me retourne le produit de l id 
            })
            .then(user => {
                //mongoose.disconnect();
                resolve(user);
            })
            .catch(err => reject(err));
    });
};

const postupdateAgence=( id, email,  password,  nom,  téléphone, adresse, registerNumber, CodePostal)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>
        {
            return Agence.updateOne({_id:id},{email:email,password:password,nom:nom,téléphone:téléphone,adresse:adresse,registerNumber:registerNumber,CodePostal:CodePostal})
        }).then(() =>{
            mongoose.disconnect()
            resolve('updated')
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
}
const postupdateuser=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findByIdAndUpdate({_id:id},{$inc:{tauxReduction:10}} )
        }).then(users=>{
            
            mongoose.disconnect()
            resolve(users)
        }).catch(err=>reject(err));
    });
};

const getuserbyname=(nom)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.find({nom:nom})     
           }).then(user=>{
            
            mongoose.disconnect()
            resolve(user)
        }).catch(err=>reject(err));
    });
};
module.exports = {getuserbyname, postupdateuser, postupdateAgence,getuserbyId, updateAgence,Agence,User, createNewAgent, createNewUser, login, loginagence,getblocrqst, getAllrequests,blocRQst,blocRQst, getAllusers,getAllagences, deleteagence, deleteUser, activeagence }