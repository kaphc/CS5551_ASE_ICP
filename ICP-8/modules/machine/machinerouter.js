const express = require('express');
const router = express.Router();
const passport = require('passport');
const Machine = require('../../models/machine/machine');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Machine.getMachines((err, data) => {
        data.forEach(element => {
            element.dateOfInstall = new Date(element.dateOfInstall).toLocaleDateString('en');
        });
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    let newMachineGroup = new Machine({
        name: req.body.name,
        machinegroup: req.body.machinegroup,
        company: req.body.company,
        model: req.body.model,
        dateOfInstall: req.body.dateOfInstall,
        qrCode: req.body.qrCode,
        area: req.body.area,
        line: req.body.line,
        barcode: req.body.barcode,
    });
    newMachineGroup.qrCode = "{ machineName :" + newMachineGroup.name + ",area:" + newMachineGroup.area + ",line:" + newMachineGroup.line + "}";
    Machine.addMachine(newMachineGroup, (err, machineGroup) => {
        if (err) {
            res.json({ success: false, msg: "Failed to Add user." });
        } else {
            res.json({ success: true, msg: "User Added." });
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res, next) {
    //console.log(req.body);
    var id = req.params.id;
    var update = {
        name: req.body.name,
        machinegroup: req.body.machinegroup,
        company: req.body.company,
        model: req.body.model,
        dateOfInstall: req.body.dateOfInstall,
        qrCode: req.body.qrCode,
        area: req.body.area,
        line: req.body.line,
        barcode: req.body.barcode,
    };
    update.qrCode = "{ machineName :" + update.name + ",area:" + update.area + ",line:" + update.line + "}"
    Machine.updateMachine(id, update, (err, machineGroup) => {
        if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Machine.deleteMachine(req.params.id, (err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error', success: false });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    })
});

module.exports = router;