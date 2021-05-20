import React,{useState} from 'react'
import {Typography,Button,Form,message,Input,Icon} from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import {useSelector} from 'react-redux'

const {TextArea}=Input
const {Title}=Typography

const PrivateOptions=[
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]
const CategoryOptions=[
    {value:0, label:"Film & Animation"},
    {value:1, label:"Autos & Vehicles"},
    {value:2, label:"Music"},
    {value:3, label:"Pets & Animals"}
]

function VideoUploadPage(props) {
    const user=useSelector(state=>state.user) //state에서 user를 가져옴(user에 대한 모든 정보들이 변수에 담김)
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange=(e)=>{
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange=(e)=>{
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange=(e)=>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange=(e)=>{
        setCategory(e.currentTarget.value)
    }
    const onDrop= (files)=>{
        let formData=new FormData;
        //서버에 요청을 전송하는데, 이를 같이 보내지 않으면 파일을 보낼 때 오류가 발생한다.
        const config={
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0])

        axios.post('/api/video/uploadfiles',formData,config)
            .then(response=>{
                if(response.data.success){
                    let variable={
                        url:response.data.url,
                        fileName:response.data.fileName
                    }
                    setFilePath(response.data.url)
                    axios.post('/api/video/thumbnail',variable)
                        .then(response=>{
                            if(response.data.success){
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            }else{
                                alert("썸네일 생성 실패")
                            }
                        })
                }else{
                    alert("비디오 업로드 실패")
                }
            })
    }

    const onSubmit=(e)=>{
        e.preventDefault(); //원래 하려고 했던 것들 방지함으로써 현재 하려는 것 수행
        const variables={
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }
        axios.post('api/video/uploadVideo',variables)
            .then(response=>{
                if(response.data.success){
                    message.success('업로드 완료')
                    setTimeout(()=>{
                        props.history.push('/')
                    },3000)
                }else{
                    alert('비디오 업로드 실패')
                }
            })
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    {/*Drop Zone*/}
                    <Dropzone
                        onDrop={onDrop}
                        //한번에 파일을 많이 올릴 것인지 하나만 올릴 것인지. fals: 하나만
                        multiple={false}
                        maxSize
                        >
                        {({getRootProps,getInputProps})=>(
                            <div style={{width:'300px',height:'240px',border:'1px solid lightgrey',display:'flex',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps}>
                                <input {...getInputProps()}/>
                                <Icon type="plus" style={{fontSize:'3rem'}}/>
                            </div>
                        )}
                    </Dropzone>
                    {/*Thumbnail*/}
                        {/*썸네일이 있을 때에만 렌더링*/}
                        {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thunbnail"/>
                    </div>
                        }
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}        
                </select>
                <br/>
                <br/>

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))} 
                </select>
                <br/>
                <br/>

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
