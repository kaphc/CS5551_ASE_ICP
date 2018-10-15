const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config/database');

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 86400 //1day
                });
                User.getUserPrivillages(user._id,(err,data)=>{
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                        },
                        privillages: data
                    });
                });
            } else {
                return res.json({ success: false, msg: "Invalid Username/Password." });
            }
        });
    });
});

router.get('/privillages/:id', passport.authenticate('jwt',{session : false}), (req, res, next) =>{
    User.getUserPrivillages(req.params.id,(err,data)=>{
        if (err) throw err;
        res.json({
            success: true,
            privillages: data
        });
    });
});

module.exports = router;