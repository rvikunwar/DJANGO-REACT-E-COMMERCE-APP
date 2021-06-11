import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Cartproduct from './Cartproduct'
import './css/payment.css'
import CurrenyFormat from 'react-currency-format'
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import {getcartproducts} from '../actions/product'
import {axios_payment} from '../axios'
import { useHistory } from "react-router-dom";


function Payment({user,state_1}) {
    const history=useHistory()
    const [error,setError]=useState(null)
    const stripe= useStripe()
    const elements=useElements()
    const [succeeded,setSucceeded]=useState(false)
    const [processing,setProcessing]=useState("")    
    const [disabled,setDisabled]=useState(true)
    const [clientSecret,setClientSecret]=useState(true)
    useEffect(()=>{
        const getClientSecret = async () => {
            const response =await axios_payment({
                method:'post',
                url:`/payments/create?total=${price*100}`
            }) ;
            setClientSecret(response.data.clientSecret)

        }
        getClientSecret();
    },[state_1])
    

    const handleSubmit =async (e) =>{
        e.preventDefault();
        setProcessing(true)
        const payload =await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            history.replace('/cart')

        })

               
    }

    
    const handleChange = e =>{
        setDisabled(e.empty);
        setError(e.error ? error.error.message:"");
    }

    const [quantity,setQuantity]=useState(0)
    const [price,setPrice]=useState(0.0)

    useEffect(()=>{

                setPrice(0.0)
                setQuantity(0)
                var e=0,p=0;
            state_1.forEach(element => {
                p+=element.price*element.quantity;
                e+=element.quantity
                    
                });
                setPrice(p)
                setQuantity(e)

            },[state_1])
        
        
            useEffect(()=>{
    getcartproducts()
            
        },[])
    return (
        <div className="payment">
            
            <div className="checkout__box">
                <h1>Checkout</h1>
            </div>
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Shipping Information</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 ,Re lane colony</p>
                        <p>pitkk ,Denmark</p>
                    </div>

                </div>

                <div className="payment__method">
                    <div className="payment__title">
                        <h3>Payment Information</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                    <CurrenyFormat renderText={(value)=>(
                                        <h3>Order value: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}/>
                        
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p>: "Buy now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>

                    </div>

                </div>

              
            </div>

            <div className="payment__container__2">
            <div className="payment__product_review">
                <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                <div className="payment__product">
                {

                    state_1.map((data,c) => (<>
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

            </div>

        </div>
    )
}


const mapStateToProps = (state) =>({
    user:state.auth.user,
    state_1:state.cartproduct.cartproducts.reverse(),
})

export default connect(mapStateToProps,{getcartproducts})(Payment)
