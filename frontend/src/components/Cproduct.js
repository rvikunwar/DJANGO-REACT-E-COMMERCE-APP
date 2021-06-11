import React from 'react'
import './css/cproduct.css'
import {connect} from 'react-redux'
import {postcartproduct,show,showbox} from '../actions/product.js'
import {setcover} from '../actions/auth.js'

function Cproduct(props) {
    return (
        <div className="cproduct" onClick={()=>{
            props.setcover()
            props.show()
            props.showbox(props.name,props.id,props.description,props.price,1,props.image,props.user_id,props.category)
        }}>
              <p>{props.name}</p>
            <div className="cproduct_div_image">
                     <img className="cproduct_image" alt="" src={props.image}/>
            </div>
           
            <div className="cproduct_price_add">
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

export default connect(mapStateToProps,{postcartproduct,showbox,show,setcover})(Cproduct)
