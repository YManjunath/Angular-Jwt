const express = require('express');
const app = express();
const Auth = require('./models/auth');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

app.use(cors());

mongoose.connect('mongodb+srv://admin-manjunath:<password>@cluster0.56noa.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0').then(
    () => {
        console.log('Database connected successfully..!')
    }
).catch((err) => {
    console.log('Unable to connect to database', err)
});

app.use(bodyParser.json());

app.use("/api/auth", authRouter);

module.exports = app;

