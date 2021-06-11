import React,{useEffect} from 'react'
import './css/navbar.css'
import logo from './images/amazon_logo.png'
import SearchIcon from '@material-ui/icons/Search';
import SubjectIcon from '@material-ui/icons/Subject';
import SettingsIcon from '@material-ui/icons/Settings';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {connect} from 'react-redux'
import {loginpage,settingpage,load_user,setcover} from '../actions/auth.js'
import {
    Link,
  
} from 'react-router-dom'

function Navbar(props) {
  
    useEffect(()=>{
      
        if(props.isAuthenticated){
 
            document.querySelector("#login_name_1").innerHTML=props.user.first_name
            document.querySelector("#login_name_2").innerHTML=props.user.first_name

 
        }
        else{
            document.querySelector("#login_name_1").innerHTML="Login"
            document.querySelector("#login_name_2").innerHTML="Login"


        }
    },[props.isAuthenticated,props.user])
   

    return (
        <div className="navbar">
            <div className="logo">
                <SubjectIcon style={{
                                        "height":"30px",
                                        "width":"40px",
                                        "display":"none"
                                        }}/>
                <img src={logo} alt="" className="img_logo"
                onClick={()=>(
                    window.location.href='/'
                )}/>
            </div>
            <div className="searchbar">
                <input type="text"/>
                <SearchIcon  style={{"cursor":"pointer","color":'black'}}/>
                
            </div>

            <p className="btn-login-search" style={{"backgroundColor":"white",
                           
                             "padding":"5px",
                           "borderRadius":"3px",
                            "paddingTop":"6px","color":"black",
                        }}
                            onClick={()=>{
                                props.loginpage()
                                if(!props.isAuthenticated){
                                    props.setcover()
                                }
                               
                            }} id="login_name_1">Login</p>
            <div className="terms">
                <p className="btn-login" style={{"backgroundColor":"white",
                            "width":"90px",
                             "padding":"5px",
                           "borderRadius":"3px",
                            "paddingTop":"6px","color":"black",
                       }}
                            onClick={()=>{
                                props.loginpage()
                                if(!props.isAuthenticated){
                                    props.setcover()
                                }
                               
                            }} id="login_name_2">Login</p>
                <p className="orders" style={{"fontSize":"11px"}}>Check your <span style={{"fontSize":"17px"}}>orders</span></p>
                <p style={{"paddingTop":"6px"}}>Prime</p>
                <Link to='/cart/'>
                     <AddShoppingCartIcon style={{"marginLeft":"4px","marginTop":"4px","cursor":"pointer","color":"white"}}/>
                </Link>
                {props.isAuthenticated?<SettingsIcon  onClick={()=>{
                                props.settingpage()

                            }} style={{"marginLeft":"4px","cursor":"pointer"}}/>:<></>}
            </div>
        </div>
    )
}
const mapStateToProps =(state) => ({
    log_on_off:state.auth.logpage,
    setting_page:state.auth.settingpage,
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
});


export default connect(mapStateToProps,{loginpage,settingpage,load_user,setcover})(Navbar)
