import './App.css';
import React ,{useEffect} from 'react'
import Navbar from './components/Navbar.js'
import Main from './components/Main.js'
import {  
        BrowserRouter as Router,
        Route,Switch  } from "react-router-dom"
import Cart from './components/Cart.js'
import Login from './components/Login.js'
import Registration from './components/Registration.js'
import {connect} from 'react-redux'
import {checkAuthenticated,load_user} from './actions/auth.js'
import Setting from './components/Setting.js'
import {getproducts,getcartproducts} from './actions/product.js'
import Productbox from './components/Productbox.js'
import Header from './components/Header.js'
import Message from './components/Message.js'
import Activation from './components/Activation.js'
import Payment from './components/Payment.js'

import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise =loadStripe(
    'pk_test_51IyEx9SIH9QNqf7omFlw51GKe63iTKM3skRVveLhavzETWYsChgNAK9pkoEYwIjGhGRYHKHyh1kwEzGwTwtfoFk600cdHtvJyr'
);


function App(props) {
    useEffect(() => {
      props.checkAuthenticated();
      props.load_user();
      props.getcartproducts();


    }, [props.isAuthenticated])
  
    useEffect(()=>{
        props.getproducts()
    },[])

   




  
   
  return (
    <div className="App">
      <Router>
     
        {props.setcover?<div className="cover-app"></div>:<></>}
         
        
         
          {props.show?<Productbox/>:<></>} 

          
         {((props.log_on_off) && (!props.isAuthenticated))?<Login/>:<></>} 
         {(props.regi_on_off && !props.isAuthenticated)?<Registration/>:<></>} 
         {(props.setting_page && props.isAuthenticated)?<Setting/>:<></>}
          <Switch>
          <Route exact path="/">
          <Navbar/>
          <Header/>
              <Main/>
     
          </Route>

          <Route path="/cart">
              <Navbar/>
              <Cart/>
     
          </Route>

          

          <Route path='/auth/users/activate/:uid/:token' >
                <Activation/>
            </Route>
            {
            props.isAuthenticated?<Route path='/payment' >
              <Navbar/>
              <Elements stripe={promise}  >
                   <Payment/>
              </Elements>
            </Route>:<></>
            }
            


          </Switch>
          {props.msg?<Message/>:<></>}

      </Router>
    </div>
  );
}

const mapStateToProps =(state) => ({
  log_on_off:state.auth.logpage,
  regi_on_off:state.auth.regipage,
  setting_page:state.auth.settingpage,
  setcover:state.auth.setcover,
  isAuthenticated:state.auth.isAuthenticated,
  show:state.cartproduct.show,
  msg:state.cartproduct.msg
})


export default connect(mapStateToProps,{checkAuthenticated,load_user,getproducts,getcartproducts})(App);
