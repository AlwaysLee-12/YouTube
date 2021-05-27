import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from '../Sections/SingleComment'
import ReplyComment from '../Sections/ReplyComment'

function Comment(props) {
    const videoId=props.videoId
    const user=useSelector(state=>state.user)
    const [commentValue, setcommentValue] = useState()
    
    //타이핑을 하게되면 입력이 가능하게 됨
    const handleClick=(e)=>{
        setcommentValue(e.currentTarget)
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const variables={
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
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

    return(
        <div >
            <br />
            <p>Replies</p>
            <hr />

            {/*Comment Lists*/}
            {props.commentLists && props.commentLists.map((comment,index)=>(
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment refreshFunction={refreshFunction} postId={videoId}/>
                        <ReplyComment refreshFunction={refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/>
                    </React.Fragment>
                )
            ))}
            

            {/*Root Comment Form*/}
            <form style={{display:'flex'}} onSubmit>
                <textarea
                    style={{width:'100%',borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <button style={{width:'20%',height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
