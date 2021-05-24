const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const Schema=mongoose.Schema

const commentSchema = mongoose.Schema({
   writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
   },
   postId:{
        type:Schema.Types.ObjectId,
        ref:'Video'
   },
   responseTo:{
        type:
        Schema.Types.ObjectId,
        ref:'User'
   },
   content:{
       type:String
   }
},{timestamps:true})

const Comment = mongoose.model('Video', commentSchema);

module.exports = { Comment }