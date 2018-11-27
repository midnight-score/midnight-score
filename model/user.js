var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {type: String , required: true},
    profession: String,
    current_location: {type: String , required: true},
    dob: String,
    email: {type: String , required: true},
    gender: {type: String , required: true},
    rating: {type: Number},
    successful_data: {type: Number},
    profile_views: {type: Number}
});

module.exports = mongoose.model('user', UserSchema);