const mongoose = require('mongoose');

//Line schema
const LineModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Line = module.exports = mongoose.model('LineModel', LineModel);

module.exports.getLineById = function (id, callback) {
    Line.findById(id, callback);
}

module.exports.addLine = function (newLine, callback) {
    //console.log(newLine);
    newLine.save(callback);
}

module.exports.updateLine = function (id, updateQuery, callback) {
    Line.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteLine = function (id, callback) {
    Line.remove({ _id: id }, callback);
}

module.exports.getLines = function (callback) {
    Line.find().exec(callback);
}

module.exports.getLineNames = function(name,callback){
    //console.log(name);
    Line.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}