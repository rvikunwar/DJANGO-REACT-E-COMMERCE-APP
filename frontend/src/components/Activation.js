import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify ,loginpage} from '../actions/auth';
import {showmsg} from '../actions/product';

import './css/activation.css'

const Activate = ({ verify,showmsg}) => {
    const [verified, setVerified] = useState(false);
    var match=useParams()
  
    const verify_account = e => {
        const uid = match.uid;
        const token = match.token;
  
        verify(uid, token);
        setVerified(true);
       showmsg(["Account activated ","01AA10"])
      
        
    };


        if (verified) {
            return <Redirect to='/' />
        }
    

    

    return (
        <div className='container_verify'>
            <div className='verify_tag'>
                <h1>Verify your Account</h1>
                <button className="btn_verify" onClick={verify_account}>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify,loginpage,showmsg })(Activate);