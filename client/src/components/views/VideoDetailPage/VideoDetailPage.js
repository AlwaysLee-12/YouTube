import React,{useEffect,useState} from 'react'
import {Row, Col, List,Avatar} from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import { Video } from '../../../../../server/models/Video'

function VideoDetailPage(props) {
    const videoId=props.match.params.videoId //App.js에서 정의한 /video/:videoId 라우트를 통해 비디오 아이디 가져옴
    const variable={videoId: videoId} 
   
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail',variable)
            .then(response=>{
                if(response.data.success){
                    setVideoDetail(response.data.VideoDetail)
                }else{
                    alert('비디오 정보 가져오기 실패')
                }
            })
    }, [])

   if(VideoDetail.writer){
    return (
        <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
                <div style={{width:'100%', padding:'3rem 4rem'}}>
                    <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} constols />
                    <List.Item
                        actions={[<Subcribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')}/>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer.image}/>}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                            />    
                    </List.Item>

                    {/* Comments */}
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>
        </Row>
    )
   }else{
       return(
           <div>...loading</div>
       )
   }
}

export default VideoDetailPage