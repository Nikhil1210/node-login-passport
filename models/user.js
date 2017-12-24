const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
});
const User = module.exports = mongoose.model('user', userSchema);
module.exports.createUser = function(newUser, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(cb);
        });
    });
};

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};