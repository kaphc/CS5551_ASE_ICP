const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user/user');

//Get
router.get('/all', (req, res, next) => {
    User.getUsers((err, data) => {
        data.forEach(element => {
            element.dateOfJoin = new Date(element.dateOfJoin).toLocaleDateString('en');
        });
        res.json(data);
        res.send(data);
    });
});

router.get('/get/:name', (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    User.getUserNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create', (req, res, next) =>{
    let newUser = new User({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        phone:req.body.phone,
        email : req.body.email,
        dateOfJoin : req.body.dateOfJoin,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added."});
        }
    });
});

//Update
router.put('/update/:id', function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        dateOfJoin: req.body.dateOfJoin,
        username: req.body.username,
        password: req.body.password
    };
    User.updateUser(id, update, (err, todo) => {
        if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id', (req, res, next) => {
    User.deleteUser(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error',success:false });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    })
});

module.exports = router;