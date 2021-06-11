import React,{useState} from 'react'
import './css/login.css'
import logo from './images/amazon_logo.png'
import {connect} from 'react-redux'
import {login,loginpage,registrationpage,settingpage,setcover} from '../actions/auth.js'
import CloseIcon from '@material-ui/icons/Close';

function Login(props) {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    function submitLoginData(){

        props.login(email, password);
        
      
               
    }

   
    return (
        <div className="login">
                            <CloseIcon style={{zIndex:"100000",
                            right:"0px",height:"30px",width:"40px",
                            position:"absolute",cursor:"pointer"}}
                            onClick={()=>{
                                props.loginpage()
                                props.setcover()
                               
                            }}/>

            <div className="login_part_1">
               
                <p className="login_title">LOGIN</p>
                <p className="login_msg">Get access to your Orders, Wishlist and Recommendations</p>
                 <img src={logo} alt="" className="login_logo"/>
            </div>
            <div className="login_part_2">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address" required/>
                <input type="password"  onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                <p>By continuing, you agree to Amazon's Terms of Use and Privacy Policy.</p>
                <button onClick={submitLoginData} className="login_button">Login</button>
                <p className="registration_link"
                onClick={()=>{
                    props.registrationpage()
                    props.loginpage()
                   
                }}>New to Amazon? Create an account</p>

            </div>
            
        </div>
    )
}



export default connect(null,{login,loginpage,registrationpage,settingpage,setcover})(Login)
