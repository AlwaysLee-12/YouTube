const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post('/saveComment',(req,res)=>{
   const commnet=new Comment(req.body)

   Comment.save((err,comment)=>{
       if(err) return res.status(400).json({success:false})

        Comment.find({'_id':comment._id})
            .populate('writer')
            .exec((err,results)=>{
                if(err) return res.status(400).json({success:false})
                return res.status(200).json({success:true})
            })
        })
})

module.exports = router;