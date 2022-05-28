const mongoose = require('mongoose');
const { Agence } = require("../models/auth.model");
const { Product } = require("../models/products.model")
const authModel = require('../models/auth.model')
const productsModel = require("../models/Product.model")
const db = require('../db');
const { ObjectId } = require('mongodb');
const { array, equal, date } = require('joi');
const { reject } = require('bcrypt/promises');
const DB_URL = "mongodb://localhost:27017/SunWay-Travel";
const tombolaSchema = mongoose.Schema({
    nom: String,
    image: String,
    category: String,
    destination: String,
    date: Date,
    description: String,
    Wilaya: String,
    nbrnuit: Number,


    participants: [
        { nom: String, prenom: String, id: String }
    ],
    gagnant: {
        type: ObjectId,
        default: null
    }
})
const Tombola = mongoose.model('tombola', tombolaSchema)
exports.getAlltombola = () => {
    //connexion database
    //get les produits
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Tombola.find({})
        }).then(tombolas => {
            mongoose.disconnect()
            resolve(tombolas)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })
}







exports.addNewTombola = (nom, category, participants, gagnant, destination, date, nbrnuit, Wilaya, description) => { //prend data et return 
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
        }).then(() => {

            let tombola = new Tombola({
                nom: nom,
                category: category,
                //image: image,
                participants: participants,
                gagnant: gagnant,
                destination: destination,
                date: date,
                nbrnuit: nbrnuit,
                Wilaya: Wilaya,
                description: description,



            })
            return tombola.save();
        })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.participer = (id1, id2) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            authModel.getuserbyId(id2).then((user) => {
                return Tombola.updateOne({ _id: id1 }, { $push: { participants: { nom: user.nom, prenom: user.prenom, id: user._id } } })
            }).then(() => {
                mongoose.disconnect()
                resolve('votre participation est bien enregistrée')
            }).catch(err => reject(err));
        })
    });
}

exports.deletetombo = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Tombola.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect()
            resolve('votre participation est bien enregistrée')
        }).catch(err => reject(err));
    })
}


exports.getwinner = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            Tombola.findById(id).then(tombola => {
                resolve(tombola)
            }).catch((err) => {
                reject(err)
            })
        })
    })
}



exports.updatetombola = (id1, id2) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            authModel.getuserbyId(id1).then(user => {
                Tombola.updateOne({ _id: id2 }, { gagnant: user._id }).then(tombola => {
                    resolve(tombola)
                }).catch((err) => {
                    reject(err)
                })
            })
        })
    })
}

exports.affichergagnant = (id, id1) => {
    return new Promise((resolve, reject) => {
        this.gettombobyid(id).then(tombola => {
            if (String(tombola.gagnant) === String(id1)) {
                mongoose.disconnect()
                resolve('vous avez gagné')
            } else {
                mongoose.disconnect()
                resolve('vous avez perdu')
            }
        }).then(() => {
            mongoose.disconnect()
            resolve(msg)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.gettombobyid = id => { //prend l id et recherche le produit 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Tombola.findById(id); // me retourne le produit de l id 
            })
            .then(tombola => {
                mongoose.disconnect();
                resolve(tombola);
            })
            .catch(err => reject(err));
    });
};