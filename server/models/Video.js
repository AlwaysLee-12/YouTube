const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const Schema=mongoose.Schema

const videoSchema = mongoose.Schema({
    writer:{
        //id만 넣어도 User 모델에서 모든 것을 불러올 수 있음
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    privacy:{
        type:Number
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true}) //만든 날과 업데이트한 날이 표시가 됨

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }