const mongoose = require('mongoose');
const { Agence } = require("./auth.model");
const DB_URL = "mongodb://localhost:27017/SunWay-Travel";
const ProductSchema = mongoose.Schema({
    nomOffre: String,
    destination: String,
    voyagerDe: String,
    depart: Date,
    nombreNuit: Number,
    nombrePersonne: Number,
    prix: Number,
    StyleVoyage: String,
    TypeHebergement: String,
    MoyenTransport: String,
    description: String,
    agenceId: String,
    agencenom: String,
    Mois: String,
    Wilaya: String,
    timestamp: String,
    photoUrl1: String,
    photoUrl2: String,
    photoUrl3: String,
    photoUrl4: String,
    photoUrl5: String,
    photoUrl6: String,
    photoUrl7: String,


})

const Product = mongoose.model("product", ProductSchema);

exports.addNewItem = data => {
    //prend data et return 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(async () => {

                const agence = await Agence.findOne({ id: data.agenceId });
                data.agencenom = agence.nom;
                let item = new Product(data);
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

exports.getItemsByAgence = agenceId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>
                Product.find({ agenceId: agenceId },
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

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        //connexion database
        //get les produits
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))

    })
}


exports.getProductsByStyle = (StyleVoyage, Wilaya, Mois) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ StyleVoyage: StyleVoyage, Wilaya: Wilaya, Mois: Mois })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};
exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>
                Product.updateOne({ _id: id }, newData)

            ).then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    })

};

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => Product.findByIdAndDelete(id))
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

/*exports.getProductsByStyleVoyage = (StyleVoyage, destination) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ StyleVoyage: StyleVoyage, destination: destination })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};*/
exports.getProductsByStyleVoyage = (StyleVoyage) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ StyleVoyage: StyleVoyage })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};
exports.getProductsByWilaya = (Wilaya) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ Wilaya: Wilaya })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};
exports.getProductsByMois = (Mois) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ Mois: Mois })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};
exports.getProductsBydestination = (destination) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ destination: destination })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};

exports.getProductById = (id) => { //prend l id et recherche le produit 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id); // me retourne le produit de l id 
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => reject(err));
    });
};

exports.getfirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findOne({}); // me retourne le produit de l id 
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => reject(err));

    })
}

