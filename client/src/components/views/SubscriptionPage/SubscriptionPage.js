import React,{useState,useEffect} from 'react'

function SubscriptionPage(props) {
    const [Video, setVideo] = useState([])

    /*DOM이 로드되자마자 할 일. []이 비어있으면 한번만. []이 없으면 계속 실행*/
    useEffect(() => {
        const subscriptionVariable={
            userFrom:localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos',subscriptionVariable)
            .then(response=>{
                if(response.data.success){
                    setVideo(response.data.videos)
                }else{
                    alert('비디오 가져오기 실패')
                }
            })
    }, [])

    const renderCards=Video.map((video,index)=>{
        var minutes=Math.floor(video.duration/60)
        var seconds=Math.floor((video.duration-minutes*60))

        return <Col lg={6} md={8} xs={24}> 
        {/*윈도우 크기가 가장 작을때는 컬럼 하나가 24 사이즈(컬럼 1), 중간일 때는 8 사이즈(컬럼 3), 가장 클때는 6사이즈(컬럼 4)*/}
                    <div style={{position:'relative'}}>
                        <a href={`/video/${video._id}`}>
                            <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                <span>{minutes}:{seconds}</span>
                            </div>       
                        </a>
                    </div>
                    <br/>
                    {/*avatar: 이미지 title: 제목 */}
                    <Meta   
                        avatar={
                            <Avatar src={video.writer.image}/>
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.writer.name}</span><br />
                    <span style={{marginLeft:'3rem'}}>{video.views} views</span>-<span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </Col>
    })

    return (
        <div style={{width:'85%',margin:'3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr />
            {/**/}
            <Row gutter={[32,16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage
