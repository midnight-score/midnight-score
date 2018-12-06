var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
});
UserSchema.plugin(uniqueValidator, { message: 'Phone Number already Exists' });



module.exports = mongoose.model('client', UserSchema);            