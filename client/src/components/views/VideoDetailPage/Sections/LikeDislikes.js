import React from 'react'
import {Tooltip,Icon} from 'antd'
import Axios from 'axios'
import { response } from 'express'

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable={}

    if(props.video){
        variable={videoId: props.videoId, userId: props.userId}
    }else{
        variable={commentId:props.commentId , userId:props.userId}
    }


    useEffect(() => {
        Axios.post('/api/like/getLikes',variable)
            .then(response=>{
                if(response.data.success){
                    //좋아요 수
                    setikes(response.data.likes.length)

                    //좋아요를 눌렀는지에 대한 여부
                    response.data.likes.map(like=>{
                        if(like.userId===props.userId){
                            setLikeAction('liked')
                        }
                    })
                }else{
                    alert('Like 정보 가져오지 못함')
                }
            })

            Axios.post('/api/like/getDislikes',variable)
            .then(response=>{
                if(response.data.success){
                    //싫어요 수
                    setDislikes(response.data.dislikes.length)

                    //싫어요를 눌렀는지에 대한 여부
                    response.data.dislikes.map(dislike=>{
                        if(dislike.userId===props.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('Like 정보 가져오지 못함')
                }
            })
    }, [])

    const onLike=()=>{
        if(LikeAction===null){
            Axios.post('/api/like/upLike',variable)
                .then(response=>{
                    if(response.data.success){
                        setLikes(Likes+1)
                        setLikeAction('liked') //like 버튼 누르면 검은색으로 눌림표시
                        if(DislikeAction!==null){
                            setDislikeAction(null)
                            setDislikes(Dislikes-1)
                        }
                    }else{
                        alert('Like를 올리지 못함')
                    }
                })
        }else{
            Axios.post('/api/like/unLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert('Like를 내리지 못함')
                }
            })
        }
    }

    const onDislike=()=>{
        if(DislikeAction!==null){
            Axios.post('/api/like/unDislike',variable)
                .then(response=>{
                    if(response.data.success){
                        setDislikes(Dislikes-1)
                        setDislikeAction('null') 
                    }else{
                        alert('Dislike을 지우지 못함')
                    }
                })
        }else{
            Axios.post('/api/like/upDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikes(Dislikes+1)
                    setDislikeAction('disliked')
                    if(LikeAction!==null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                    }
                }else{
                    alert('Like를 내리지 못함')
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction==='liked'? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{padding:'8px',cursor:'auto'}}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction==='disliked'? 'filled':'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{padding:'8px',cursor:'auto'}}>{Dislikes}</span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
