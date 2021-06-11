import React from 'react'
import './css/productbox.css'
import CloseIcon from '@material-ui/icons/Close';
import {setcover} from '../actions/auth.js'
import {show,postcartproduct} from '../actions/product.js'

import {connect} from 'react-redux'


function Productbox(props) {
    return (
        <div className="productbox">
            <div className="productbox_1">
                    <img className="productbox_image"
                    src={props.data.image}
                    alt=""/>
                

            </div>
            <div className="productbox_2">
                
                    {(window.innerWidth<=500)?
                    <CloseIcon  style={{zIndex:"100000",
                    right:"5%",top:"50px",height:"30px",width:"40px",
                    position:"fixed",cursor:"pointer"}}
                    onClick={()=>{
                        props.setcover()
                        props.show()
                    }}/>
                    :
                    <CloseIcon  style={{zIndex:"100000",
                            right:"15%",top:"90px",height:"30px",width:"40px",
                            position:"fixed",cursor:"pointer"}}
                            onClick={()=>{
                                props.setcover()
                                props.show()
                            }}/>
                    }

                <p className="title">{props.data.name}</p>
                <p className="description">{props.data.description}</p>
                <p className="category">Category - {props.data.category}</p>
                <div className="btn">
                    <p className="p1">{props.data.price}</p>
                    <button onClick={()=>{
                                         props.postcartproduct(props.data.name,props.data.id,props.data.description,props.data.price,1,props.data.image,props.data.user_id)

                    }}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
        data:state.cartproduct.box
})
export default connect(mapStateToProps,{setcover,show,postcartproduct})(Productbox)
