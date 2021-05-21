import Axios from 'axios'
import React,{useEffect,useState} from 'react'

function Subscribe(props) {
    let variable={userTo:props.userTo}

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        Axios.post('/api/subscribe/subscribeNumber',variable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보 받아오기 실패')
                }
            })
        
        let subscribedVariable={userTo:props.userTo, userFrom:localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subscribed',subscribedVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                }else{
                    alert('정보를 받아오는데 실패')
                }
            })
    }, [])

    return (
        <div>
            <button
                style={{backgroundColor:`${Subscribe ? '#CC0000':'#AAAAAA'}`,borderRadius:'4px',
                color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
                }}
                onClick
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
