
import React ,{useEffect} from 'react'
import './css/message.css'
import {showmsg} from '../actions/product.js'
import {connect} from 'react-redux'

function Message(props) {
    useEffect(()=>{
        setTimeout(()=>{
            try{
                document.querySelector(".message").style.opacity=0;
    
            }
            catch{
    
            }
         setTimeout(()=>{
                props.showmsg([null,null])
         },1000)
        },800)
    
    },[props.msg])
       
        return (
            <div className="message" style={{"backgroundColor":`#${props.message[1]}`}}>
             <p>{props.message[0]}</p>
            </div>
        )

}
const mapStateToProps = (state)=>({
    msg:state.cartproduct.msg,
    message:state.cartproduct.message
})

export default connect(mapStateToProps,{showmsg})(Message)
