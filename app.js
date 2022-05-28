require("dotenv").config();
//const cors = require("cors");
//const initRoutes = require("./routes/index");
const bodyParser = require('body-parser')

const mongodb = require('mongodb');

const socketio = require("socket.io")
const passwordReset = require("./routes/passwordReset");
var logger = require('morgan');
const express = require('express')
const path = require('path')
//const session = require('express-session')
/*const SessionStore = require('connect-mongodb-session')(session)*/
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const adminRouter = require('./routes/admin.route')
const voyageRouter = require('./routes/voyagecarte.route')
const quiSNRouter = require('./routes/Quisn.route')
const ajoutRouter = require('./routes/ajout.route')
const listeRouter = require('./routes/liste.route')
const reserRouter = require('./routes/reser.route')
const voyageursRouter = require('./routes/voyageurs.route')
const OffreRouter = require('./routes/Offre.route')
const contactRouter = require('./routes/contact.route')
const MesVoyagesRouter = require('./routes/mesVoyages.route')
const demandeRouter = require('./routes/demande.route')
messageRouter = require('./routes/message.route')


const agenceRouter = require('./routes/agence.route')
const msgAdminRouter = require('./routes/msgAdmin.route')
const flash = require('connect-flash')
const app = express()
const server = require('http').createServer(app)
const io = socketio(server)
io.on('connection', socket => {
    console.log('user connected');
    socket.join();
})
const authRouter = require('./routes/auth.rout')
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(flash())
/*const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/SunWay-Travel',
    collection: 'sessions'
})

/*app.use(session({
    secret: "c'est mon premier projet en dev web",
    saveUninitialized: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    store: STORE
))*/

const session = require("./db");
app.use(session);
//app.use(cors(corsOptions));
//app.use(express.urlencoded({ extended: true }));
//initRoutes(app);
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use("/password-reset", passwordReset);
app.get('/get-email', function (req, res, next) {
    res.render('get-email', {
        title: 'Forget Password Page',
    });
});
app.get('/password-reset/:userId/:token', function (req, res, next) {
    res.render('reset-password', {
        title: 'Reset Password Page',
        userId: req.params.userId,
        token: req.params.token
    });
});

const initRoutes = require("./routes/index");
initRoutes(app);






app.use('/', authRouter)
app.use('/', homeRouter)
//app.use('/Offres', productRouter)
app.use('/admin', adminRouter);
app.use('/creerVoyage', voyageRouter);
app.use('/Quisommenous', quiSNRouter);
app.use('/MesVoyages', MesVoyagesRouter)
app.use('/product', productRouter)
app.use('/demande', demandeRouter)
app.use("/reser", reserRouter)
app.use('/ajout', ajoutRouter);
app.use('/liste-reservations', listeRouter)
app.use('/liste-voyageurs', voyageursRouter)
app.use('/msgAdmin', msgAdminRouter);
app.use("/agence", agenceRouter)
app.use("/MesOffres", OffreRouter)
app.use("/contact", contactRouter)
app.use("/message", messageRouter)


app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Make sure fields are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail');
        return;
    }

    // Construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const postData = JSON.stringify(data);

    fetch('https://usX.api.mailchimp.com/3.0/lists/<YOUR_AUDIENCE_ID>', {
        method: 'POST',
        headers: {
            Authorization: 'auth <YOUR_API_KEY>'
        },
        body: postData
    })
        .then(res.statusCode === 200 ?
            res.redirect('/success') :
            res.redirect('/fail'))
        .catch(err => console.log(err))
})




const tomboRouter = require('./routes/tombola.rout')
//const tomboadminRouter = require('./routes/tomboADmin.route')




const successRouter = require('./routes/success.route')
const failRouter = require('./routes/fail.route')






app.use("/", tomboRouter)
//app.use("/tombolaAdmin", tomboadminRouter)
app.use("/success", successRouter)
app.use("/fail", failRouter)
/*app.post('/uploadfile', upload.single('myFile',(req,res,next)=>{
    const file =req.file;

    if(!file) {
        const error = newError("please upload file");
        error.httpStatusCode = 400;
        return next (error)
    }
    res.send(file);
}))*/
app.get('/', (req, res, next) => {
    res.render('index')
})
server.listen(3000, (err) => {
    console.log(err)
    console.log('server listen on port 3000')
})