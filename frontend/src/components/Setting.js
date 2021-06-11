import React from 'react'
import './css/setting.css'
import {connect} from 'react-redux'
import {logout,settingpage,loginpage} from '../actions/auth.js'
import {getcartproducts} from '../actions/product'


function Setting(props) {

    return (
        <div className="setting">
            <p>HOME</p>
            <hr className="line_3"/>
            <p>PRIME</p>
            <hr className="line_3"/>
            <p>USER</p>
            <hr className="line_3"/>
            <p>CART</p>
            <hr className="line_3"/>
            

            <p onClick={()=>{
                props.logout()
                props.settingpage()
                props.getcartproducts()
                
            }}>LOGOUT</p>
         
        </div>
    )
}


export default connect(null,{logout,settingpage,loginpage,getcartproducts})(Setting)
