const mongoose = require('mongoose');

//Reasons schema
const ReasonModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Reason = module.exports = mongoose.model('ReasonModel', ReasonModel);

module.exports.getReasonById = function (id, callback) {
    Reason.findById(id, callback);
}

module.exports.addReason = function (newReason, callback) {
    //console.log(newReason);
    newReason.save(callback);
}

module.exports.updateReason = function (id, updateQuery, callback) {
    Reason.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteReason = function (id, callback) {
    Reason.remove({ _id: id }, callback);
}

module.exports.getReasons = function (callback) {
    Reason.find().exec(callback);
}
