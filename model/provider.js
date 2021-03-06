let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    full_info: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    service_rate: {
        type: Number,
        default: 500,
    },

    avilable_times: [{
        type: String,
        times: {
            start: Date,
            end: Date
        }
    }],
  
    service_requested_from: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    service_accepted_of: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],

    pending_requests: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    profile_views: {
        type: Number
    },

    successful_dates: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    verified: {
        type: Boolean,
        default: false,
    },
    image: [{
        type: String
    }]


},{timestamps:true});
UserSchema.plugin(uniqueValidator, { message: 'Phone Number already Exists' });

UserSchema.methods.editProfileJSON = function (userId) {
    return {
        avilable_status: this.avilable_status,
        avilable_times: this.avilable_times,
        service_rate: this.service_rate,
        // full_name : userId.full_name
    }
};

UserSchema.methods.ProfileJSONFor = function (userId) {
    return {
        full_name: this.full_name,
        age: this.age,
        current_location: this.current_location,
        avilable_status: this.avilable_status,
        image: this.image
    }
}

UserSchema.methods.requestedBook = function(user){
    this.service_requested_from.push(user);
    return this.save();
}


module.exports = mongoose.model('provider', UserSchema);