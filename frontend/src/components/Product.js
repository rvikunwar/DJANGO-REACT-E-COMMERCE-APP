import React from 'react'
import "./css/product.css"
import {postcartproduct,showbox,show} from '../actions/product.js'
import {setcover} from '../actions/auth.js'

import {connect} from 'react-redux'

function Product(props) {
    return (
        <div className="product" onClick={()=>{
            props.setcover()
            props.show()
            props.showbox(props.name,props.id,props.description,props.price,1,props.image,props.user_id,props.category)
        }}>
            <p>{props.name}</p>
            <div className="product_div_image">
                     <img className="product_image" alt="" src={props.image}/>
            </div>
           
            <div className="product_price_add">
                <p>{props.price} $</p>
                <button onClick={()=>{
                    props.postcartproduct(props.name,props.id,props.description,props.price,1,props.image,props.user_id)
                    props.setcover()
                    props.show()
                }}>Add to cart</button>
            </div>
           
        </div>
    )
}

const mapStateToProps=(state)=>({
    user_id:state.auth.user.id,
    
})
export default connect(mapStateToProps,{postcartproduct,setcover,showbox,show})(Product)

