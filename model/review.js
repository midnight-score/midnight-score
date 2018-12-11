let mongoose = require('mongoose');
let User = require('./user');
let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
    description:{
        type:String,
        required:false,
    },
    rating:{
        type:Number,
        required:true,
        default:1,
    },
    //who made this comment
    reviewer:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    //to whom this review was intended to.
    reviewee:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});

module.exports = mongoose.model('review',ReviewSchema);