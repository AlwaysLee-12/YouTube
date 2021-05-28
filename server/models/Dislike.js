const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const Schema=mongoose.Schema

const dislikeSchema = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    commentId:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    },
    videoId:{
        type:Schema.Types.ObjectId,
        ref:'Video'
    }
},{timestamps:true})

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }