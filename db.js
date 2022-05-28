const session = require('express-session')
const express = require('express')
const SessionStore = require('connect-mongodb-session')(session)
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/SunWay-Travel',
    collection: 'sessions'
})

module.exports = session({
    secret: "c'est mon premier projet en dev web",
  saveUninitialized: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  useUnifiedTopology: true,
  resave: false,
    store: STORE
});
