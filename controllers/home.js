const path = require("path");

const home = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../views/index.html`));
}; // this is to call the upload file views

module.exports = {
    getHome: home
};