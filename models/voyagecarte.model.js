const mongoose = require('mongoose');
const { User } = require("../models/auth.model");
const DB_URL = "mongodb://localhost:27017/SunWay-Travel";
const demandeSchema = mongoose.Schema({
    StyleVoyage: String,
    lieu: String,
    destination: String,
    depart: Date,
    retour: Date,
    adulte: Number,
    enfant: Number,
    nombrechambre: Number,
    username: String,
    MoyenTransport: String,
    budjet: Number,
    description: String,
    userId: String,

})

const demandeItem = mongoose.model("demande", demandeSchema);

exports.addNewItem = data => { //prend data et return 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(async () => {
                const user = await User.findOne({ id: data.userId });
                data.username = user.nom;
                let item = new demandeItem(data);
                return item.save();
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

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>
                demandeItem.find({ userId: userId },
                    {},
                    { sort: { timestamp: 1 } })


            ).then(items => {
                mongoose.disconnect();
                resolve(items);

            }
            )
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    }
    );
};
exports.getProductById = (id) => { //prend l id et recherche le produit 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return demandeItem.findById(id); // me retourne le produit de l id 
            })
            .then(demande => {
                mongoose.disconnect();
                resolve(demande);
            })
            .catch(err => reject(err));
    });
};

exports.getdemande = () => {
    //connexion database
    //get les produits


    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return demandeItem.find({})
        }).then(demandes => {
            mongoose.disconnect()
            resolve(demandes)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })

}
exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => demandeItem.findByIdAndDelete(id))
            .then(() => {
                mongoose.disconnect();
                resolve();

            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}