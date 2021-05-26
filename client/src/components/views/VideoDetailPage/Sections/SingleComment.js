import React,{useEffect,useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import Axios from 'axios'
import {useSelector} from 'react-redux'

function SingleComment(props) {
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState(initialState)
    
    const onClickReplyOpen=()=>{
        setOpenReply(!OpenReply)
    }
    const actions=[
        <span onClick={onClickReplyOpen} key="comment-basis-to">Reply</span>
    ]
    const onHandleChange=(e)=>{
        setCommentValue(e.currentTarget.CommentValue)
    }
    const onSubmit=(e)=>{
        e.preventDefault()

        const variables={
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
            if(response.data.success){
                props.refreshFunction(response.data.result)
                setcommentValue("")
            }else{
                alert('코멘트를 저장하지 못함')
            }
        })
    }

    return (
        <div>
            <Comment
                actions={actions} 
                author={props.comment.writer.name}
                avatar={<Avatar src alt />}
                content={<p>{props.comment.content}</p>}
            />
            {/*OpenReply가 true일때만 해당 폼이 열리게*/}
            {OpenReply && 
                <form style={{display:'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width:'100%',borderRadius:'5px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해주세요"
                    />
                    <br />
                    <button style={{width:'20%',height:'52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
