const mongoose = require('mongoose');

//Machine Group schema
const MachineGroupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const MachineGroup = module.exports = mongoose.model('MachineGroupModel', MachineGroupModel);

module.exports.getMachineGroupById = function (id, callback) {
    MachineGroup.findById(id, callback);
}

module.exports.addMachineGroup = function (newMachineGroup, callback) {
    //console.log(newMachineGroup);
    newMachineGroup.save(callback);
}

module.exports.updateMachineGroup = function (id, updateQuery, callback) {
    MachineGroup.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteMachineGroup = function (id, callback) {
    MachineGroup.remove({ _id: id }, callback);
}

module.exports.getMachineGroups = function (callback) {
    MachineGroup.find().exec(callback);
}
