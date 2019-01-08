let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    service_requested_to: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    service_accepted_by: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
},{timestamps:true});
UserSchema.plugin(uniqueValidator, { message: 'Phone Number already Exists' });



module.exports = mongoose.model('client', UserSchema);            