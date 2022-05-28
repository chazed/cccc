const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
//const dbConfig = require("../config/db");

var storage = new GridFsStorage({
    url: "mongodb://localhost:27017/SunWay-Travel",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-SunWay-Travel-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-SunWay-Travel-${file.originalname}`
        };
    }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;