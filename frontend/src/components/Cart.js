import React ,{useState,useEffect} from 'react'
import './css/cart.css'
import Cartproduct from './Cartproduct.js'
import Cproduct from './Cproduct.js'
import {connect} from 'react-redux'
import {getcartproducts} from '../actions/product'

function Cart(props) {
   
    const [quantity,setQuantity]=useState(0)
    const [price,setPrice]=useState(0.0)

    useEffect(()=>{

        setPrice(0.0)
        setQuantity(0)
        var e=0,p=0;
        props.state_1.forEach(element => {
         p+=element.price*element.quantity;
         e+=element.quantity
            
        });
        setPrice(p)
        setQuantity(e)

    },[props.state_1])
  
  
    useEffect(()=>{
  props.getcartproducts()
    
 },[])

    return (
        <div className="cart">
            <div className="basket">
                <div className="product_basket">
                    <p className="shopping_cart_title">Shopping Cart</p>
                    
                 <div className="cart_box">
                    {

                      props.state_1.map((data,c) => (<>
                            <Cartproduct key={c} name={data.name} 
                            description={data.description}
                            price={data.price} 
                            image={data.image}
                            category={data.category}
                            quantity={data.quantity}
                            id={data.id} />
                            <hr className="line"/>
                            </>
                        ))
                    }
                </div>

                </div>
                <div className="checkout">
                    <p className="place_your">Place your order</p>
                    <hr className="line_2"/>
                    <h1 className="order_summary">Order summary</h1>
                    <div className="checkout_box">
                       {(window.innerWidth>=600 ||window.innerWidth<=435)?
                       <table>
                          <tbody>
                          <tr >
                              <td>Items</td>
                              <td>{quantity}</td>
                             
                          </tr>
                         
                          <tr >
                          <td>Total before tax</td>
                              <td>{price.toFixed(2)} ₹</td>    
                          </tr>
                          <tr>
                          <td>Estimated tax </td>
                          <td>0 ₹</td>
                          </tr>
                          <tr>
                              <td>Order total </td>
                              <td>{(price+0.0).toFixed(2)} ₹</td>
                          </tr>
                          </tbody>
                          </table>
                        :
                        <table >
                        <tbody>
                           <tr >
                               <td>Items</td>
                               <td>Total before tax</td>
                               <td>Estimated tax </td>
                               <td>Order total </td>
                              
                           </tr>
                          
                           <tr >
                                <td>{quantity}</td> 
                               <td>{price.toFixed(2)} ₹</td>  
                              
                               <td>0 ₹</td> 
                               <td>{(price+0.0).toFixed(2)} ₹</td>
                           </tr>
                        
                           </tbody>
                           </table>}
                
                    

                         
                   </div>
                   

                </div>

            </div>
            
            <div className="suggestions">
            {

               props.state_2.map((data,c) => (
                    <Cproduct key={c} cart  name={data.title} 
                    description={data.description}
                    price={data.price} 
                    image={data.image}
                    category={data.category}
                    quantity={data.quantity}

                    id={data.id} />
                ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
     state_1:state.cartproduct.cartproducts.reverse(),
     state_2:state.cartproduct.state
})

export default connect(mapStateToProps,{getcartproducts})(Cart)
