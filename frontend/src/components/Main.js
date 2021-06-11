import React,{useEffect} from 'react'
import "./css/main.css"
import Product from "./Product.js"
import {connect} from 'react-redux'


function Main(props) {

   
 
   useEffect(()=>{

    if((props.log_on_off ||props.regis_on_off) &&(!props.isAuthenticated)){
        document.querySelector("#main_page").style.backgroundColor="rgba(0,0,0,0.3)";
        
    }
    else{
        document.querySelector("#main_page").style.backgroundColor="#DCEAF5";

    }
   },[props.log_on_off,props.regis_on_off,props.isAuthenticated])
  
  

    return (
        <div className="main" id="main_page">
   
         {

          props.products.map((data,c) => (
                <Product prod key={c} name={data.title} 
                description={data.description}
                price={data.price} 
                image={data.image}
                category={data.category}
                quantity={data.quantity}
                id={data.id} />
            ))
         }
        </div>
    )
}


const mapStateToProps =(state) => ({
    log_on_off:state.auth.logpage,
    regis_on_off:state.auth.regipage,
    isAuthenticated:state.auth.isAuthenticated,
    products:state.cartproduct.state,

});


export default connect(mapStateToProps,null)(Main)
