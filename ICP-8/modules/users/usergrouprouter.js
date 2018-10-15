const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserGroup = require('../../models/user/usergroup');

//Get
router.get('/all', passport.authenticate('jwt',{session : false}),(req, res, next) => {
    UserGroup.getUserGroups((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}), (req, res, next) =>{
    let newUserGroup = new UserGroup({
        name : req.body.name,
        description: req.body.description,
        users:req.body.users,
        privillages : req.body.privillages
    });
    UserGroup.addUserGroup(newUserGroup, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added."});
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}), function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description: req.body.description,
        users:req.body.users,
        privillages : req.body.privillages
    };
    UserGroup.updateUserGroup(id, update, (err, todo) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    UserGroup.deleteUserGroup(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error',success:false });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    })
});

module.exports = router;