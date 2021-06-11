import React,{useState} from 'react'
import './css/registration.css'
import logo from './images/amazon_logo.png'
import {loginpage,registrationpage,signup,setcover} from '../actions/auth.js'
import {connect} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';


function Registration(props) {

    const [email,setEmail]=useState("")
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [password,setPassword]=useState("")

    const [password2,setPassword2]=useState("")
    function submitRegisterData(){

        props.signup(email,firstname,lastname,password,password2)
        
               
    }
    return (
        <div className="registration">
                <CloseIcon style={{zIndex:"100000",
                            right:"0px",height:"30px",width:"40px",
                            position:"absolute",cursor:"pointer"}}
                            onClick={()=>{
                                props.registrationpage()
                              
                                props.setcover()
                            }}/>
               <div className="register_part_1">
               
                <p className="register_title">REGISTER</p>
                <p className="register_msg">Get access to your Orders, Wishlist and Recommendations</p>
                 <img src={logo} className="register_logo" alt=""/>
            </div>
            <div className="register_part_2">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address"/>
                <div className="flname">
                    <input type="text" 
                    style={{"marginRight":"10px"}} onChange={(e)=>{setFirstname(e.target.value)}} placeholder="First name"/>
                    <input type="text"  onChange={(e)=>{setLastname(e.target.value)}} placeholder="Last name"/>
                </div>
                <input type="password"  onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                <input type="password"  onChange={(e)=>{setPassword2(e.target.value)}} placeholder="Confirm password"/>
                 
                <p>By continuing, you agree to Amazon's Terms of Use and Privacy Policy.</p>
                <button onClick={submitRegisterData} className="register_button">Register</button>
                <p className="registration_link"
                 onClick={()=>{
                    props.loginpage()
                    props.registrationpage()
                 
                }}>Already an account? Login</p>

            </div>
            
        </div>
    )
}





export default connect(null,{loginpage,registrationpage,signup,setcover})(Registration)
