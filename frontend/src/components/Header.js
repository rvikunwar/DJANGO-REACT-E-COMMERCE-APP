import React from 'react'
import './css/header.css'
import Head from './images/head1.jpg'
import mob from './images/mob2.jpg'


function Header() {

    return (
        <div className="header">
            {window.innerWidth<=500?
               <img src={mob} alt=""/>
            :
            <img src={Head} alt=""/>
            }
         
        </div>
    )
}

export default Header
