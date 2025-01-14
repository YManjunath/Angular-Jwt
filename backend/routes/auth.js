const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Auth = require('../models/auth');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new Auth({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save().then((result) => {
            res.status(200).json({
                message: 'User added successfully!',
                result: result
            });
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    Auth.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                "secret_key",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                user: fetchedUser
            });
        }).catch(err => {
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
});

module.exports = router;

