var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var ProviderSchema = require('../model/provider')
var ClientSchema = require('../model/client')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
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
        type: Number,
        required: true,
        unique: true
    },
    current_location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 7
    },
    payment_history: [{
        type: String,

    }],
    balance: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false,
    },
    image: [{
        type: String
    }],
    user_type: {
        type: String,
        default: 'provider'
    },
    service_generator: {
        type: Schema.Types.ObjectId,
        ref: 'provider' 
        // this.user_type === 'provider' ? 'provider' : 'client'
    },
    service_consumer: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    avilable_status: {
        type: Boolean,
        default: true
    },
});
UserSchema.plugin(uniqueValidator, { message: 'Phone Number already Exists' });

UserSchema.methods.toProfileJSON = function (userId) {
        return {
            rating: this.rating,
            full_name: this.full_name,
            age: this.age,
            rating: this.rating,
            gender: this.gender,
            current_location: this.current_location,
        }
};

UserSchema.methods.ProfileJSONFor = function (userId) {
    return {
        full_name: this.full_name,
        age: this.age,
        current_location: this.current_location,
        image: this.image,
        gender: this.gender,
        service_rate: this.service_generator.service_rate,
        likes: this.service_generator.liked.length,
        avilable_status: this.avilable_status,
        avilable_times: this.service_generator.avilable_times
            .map(time=> {
                return time.times
            }),
    }
}


module.exports = mongoose.model('user', UserSchema);            