import React from 'react'
import './css/cartproduct.css'
import {connect} from 'react-redux'
import {deletecartproduct,increment,decrement} from '../actions/product.js'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
function Cartproduct(props) {
    return (
        <div className="cartproduct">
             
            <div className="cart_product_div_image">
                     <img className="cart_product_image" alt="" src={props.image}/>
            </div>
            <div className="mid">
                <p>{props.name}</p>
                <p className="description-cart">{props.description}</p>
                
                <div className="cart_product_price_delete">
                    <div style={{"marginBottom":"-12px"}}>
                        <button>Quantity {props.quantity}</button>
                        <KeyboardArrowDownIcon style={{"border":"1px solid black","marginRight":"3px","marginBottom":"-12px"}}
                        onClick={()=>{
                            props.decrement(props.id,props.name,props.description,props.image,props.price,props.quantity,1)
                        }}/>
                        <KeyboardArrowUpIcon style={{"border":"1px solid black","marginBottom":"-12px"}}
                         onClick={()=>{
                            props.increment(props.id,props.name,props.description,props.image,props.price,props.quantity,1)
                        }}/>
                    </div>
                    
                        <button onClick={()=>{
                            props.deletecartproduct(props.id)
                        }}>Remove</button>
                </div>
            </div>
           
           
            <div className="cart_product_price_add">
                <p>{props.price} ₹</p>
               
            </div>
        </div>
    )
}

export default connect(null,{deletecartproduct,increment,decrement})(Cartproduct)
