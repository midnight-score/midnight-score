var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: { 
        type: String, required: true
     },
    rating: { 
        type: Number
     },
    profile_views: {
         type: Number 
        },
    successful_dates: { 
        type: Number 
    },
    age: {
         type: String, 
         required: true 
        },
    email: {
         type: String,
         required: true
     },
    gender: {
         type: String,
          required: true
     },
    profession: {
         type: String,
          required: true
     },
    phone_number: {
         type: String,
          required: true
     },
    current_location: { 
        type: String, 
        required: true
     },
    pending_requests: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    verified: {
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model('user', UserSchema);