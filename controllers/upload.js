const upload = require("../middleware/upload");
//const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = "mongodb://localhost:27017/";

const baseUrl = "http://localhost:3000/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files.length <= 6) {
            return res
                .status(400)
                .send({ message: "Vous devez  ajouter 7 images pour votre Offre ." });
        }


        await mongoClient.connect();
        const database = mongoClient.db("SunWay-Travel");
        const images = database.collection("photos.files");
        const cursor = await images.find({}).sort({ _id: -1 }).limit(7);
        let fileInfos = [];
        await cursor.forEach((doc) => {
            console.log(doc);
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
            });
        });
        const product = database.collection("products");
        const filter = { photoUrl1: "" };

        const options = { upsert: true };


        const updateDoc = {
            $set: {
                photoUrl1: fileInfos[0].url,
                photoUrl2: fileInfos[1].url,
                photoUrl3: fileInfos[2].url,
                photoUrl4: fileInfos[3].url,
                photoUrl5: fileInfos[4].url,
                photoUrl6: fileInfos[5].url,
                photoUrl7: fileInfos[6].url,
            },
        };
        const result = await product.updateOne(filter, updateDoc, options);

        res.redirect('/MesOffres');
        // console.log(req.file);

        // if (req.file == undefined) {
        //   return res.send({
        //     message: "You must select a file.",
        //   });
        // }

        // return res.send({
        //   message: "File has been uploaded.",
        // });
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`,
        });

        // return res.send({
        //   message: "Error when trying upload image: ${error}",
        // });
    }
};

const getListFiles = async (req, res) => {
    try {
        await mongoClient.connect();

        const database = mongoClient.db("SunWay-Travel");
        const images = database.collection("photos.files");

        const cursor = images.find({});

        if ((await cursor.count()) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
            });
        });

        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const download = async (req, res) => {
    try {
        await mongoClient.connect();

        const database = mongoClient.db("SunWay-Travel");
        const bucket = new GridFSBucket(database, {
            bucketName: "photos",
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res.status(404).send({ message: "Cannot download the Image!" });
        });

        downloadStream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

module.exports = {
    uploadFiles, //1st
    getListFiles, // 2sd
    download, // okkkkkk
};