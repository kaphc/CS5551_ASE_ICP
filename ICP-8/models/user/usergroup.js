const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Group schema
const UserGroupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    privillages: [{
        type: String
    }]
});

const UserGroup = module.exports = mongoose.model('UserGroupModel', UserGroupModel);

module.exports.getUserGroupById = function (id, callback) {
    UserGroup.findById(id, callback);
}

module.exports.addUserGroup = function (newUserGroup, callback) {
    //console.log(newUserGroup);
    newUserGroup.save(callback);
}

module.exports.updateUserGroup = function (id, updateQuery, callback) {
    UserGroup.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteUserGroup = function (id, callback) {
    UserGroup.remove({ _id: id }, callback);
}

module.exports.getUserGroups = function (callback) {
    UserGroup.find().populate('users').exec(callback);
}

module.exports.getUserGroupByUserId = function(id,callback){
    UserGroup.find(). populate({
        path: 'users',
        match: { _id: { $eq: id }},
      }).exec(callback);
}
