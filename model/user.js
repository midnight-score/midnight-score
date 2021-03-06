let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let ProviderSchema = require('../model/provider')
let ClientSchema = require('../model/client')
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
        enum:['male','female'],
        required: true
    },

    phone_number: {
        type: String,
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
        enum:['provider','client'],
    },
    service_generator: {
        type: Schema.Types.ObjectId,
        ref: 'provider',
        autopopulate: true 
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
UserSchema.plugin(require('mongoose-autopopulate'));
// JWT Token 
UserSchema.methods.generateJWT = function() {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jsonwebtoken.sign({
        id:this._id,
        username:this.email,
        exp : parseInt(exp.getTime() / 1000),
    }, secret);
};

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