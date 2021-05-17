const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer= require('multer');
const ffmpeg=require("fluent-ffmpeg");
const { JSONCookie } = require('cookie-parser');

//=================================
//             Video
//=================================

//Storage Multer Config
//프로젝트 폴더의 uploads 폴더에 파일 저장
let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Data.now()}_${file.originalname}`);
    },
    fileFilter:(req,file,cb)=>{
        const ext=path.extname(file.originalname)
        if(ext!=='.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'),false);
        }
        cb(null,true)
    }
})
const upload=multer({storage:storage}).single("file");

router.post('/uploadfiles',(req,res)=>{
    //비디오를 서버에 저장
    upload(req,res,err=>{
        if(err){
            return res.json({success:false},err)
        }
        return res.json({success:true,url:res.req.file.path,fileName:res.req.file.filename})
    })
})

router.post('/uploadVideo',(req,res)=>{
    //비디오 정보들 저장
    const video=new Video(req.body) //req.body를 통해 client에서 보낸 모든 variables들에 대한 정보 받음
    video.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })
})

router.post('/thumbnail',(req,res)=>{
    //썸네일 생성 후 비디오 러닝타임 가져오기
    let filePath=""
    let fileDuration=""

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url,function(err,metadata){
        console.dir(metadata)
        console.log(metadata.format.duration)
        fileDuration=metadata.format.duration
    })

    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames',function(filenames){
        //비디오 썸네일 파일 이름 생성
        console.log('Will generate '+filenames/JSONCookie(', '))
        console.log(filenames)

        filePath="uploads/thumbnails/"+filenames[0]
    })
    .on('end',function(){
        //썸네일 생성 후 작업
        console.log('Screenshots taken')
        return res.json({success:true, url: filePath, fileDuration: fileDuration})
    })
    .on('error',function(err){
        //에러 처리
        console.error(err)
        return res.json({success:false,err})
    })
    .screenshots({
        //count개의 썸네일을 찍을 수 있음. folder: 해당 경로에 썸네일 저장. 썸네일 사이즈와 이름 포맷 설정
        count:3,
        folder:'uploads/thumbnails',
        size:'320x240',
        filename:'thumbnail-%b.png'
    })
})

module.exports = router;