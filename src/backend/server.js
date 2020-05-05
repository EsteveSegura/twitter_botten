require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.connect(process.env.URI_MONGODB || 'mongodb://localhost/tristinder', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => console.log('Connected to database'))
    .catch((err) => console.log('Fail conecting to database'))


//ApiRoute
const api = require('./routes/api.js');

//Init
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_KEY || 'supersecret1',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 6000000000}
}));

//Sets
app.set('trust proxy', 1);

//API
app.use('/api', api);

//Listen
app.listen(process.env.PORT || 3000, () =>{
    console.log(`App running on ${process.env.PORT || 3000}`);
});