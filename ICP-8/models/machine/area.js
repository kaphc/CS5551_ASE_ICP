const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Area schema
const AreaModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lines: [{
        type: Schema.Types.ObjectId,
        ref: 'LineModel'
    }],
});

const Area = module.exports = mongoose.model('AreaModel', AreaModel);

module.exports.getAreaById = function (id, callback) {
    Area.findById(id, callback);
}

module.exports.addArea = function (newArea, callback) {
    //console.log(newArea);
    newArea.save(callback);
}

module.exports.updateArea = function (id, updateQuery, callback) {
    Area.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteArea = function (id, callback) {
    Area.remove({ _id: id }, callback);
}

module.exports.getAreas = function (callback) {
    Area.find().populate('lines').exec(callback);
}
