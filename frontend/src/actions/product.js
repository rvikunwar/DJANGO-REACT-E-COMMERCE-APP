import axios from 'axios';
import store from  '../store.js'
import {
  
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    POST_CART_PRODUCT_SUCCESS,
    GET_CART_PRODUCT,
    DELETE_CART_PRODUCT_SUCCESS,
    INCREMENT,
    DECREMENT,
    PUT_CART_PRODUCT_SUCCESS,
    FAIL_CART_PRODUCT,
    SHOW_PRODUCT,
    CLICKED_PRODUCT,
    
    SHOW_MESSAGE
} from './type';

var base_url='http://127.0.0.1:8000'

export const getproducts = () => async dispatch => {
   

        try {
            const res=await axios.get(`https://fakestoreapi.com/products`)
           
            dispatch({
                type: GET_PRODUCT,
                payload:res.data
                
            });

        } catch (err) {
            dispatch({
                type: GET_PRODUCT_FAIL,
               
                
            });

        };


};




export const getcartproducts = () => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
           
        }
    };
    
 
    try {
        await axios.get(`${base_url}/api/cartproducts/`,config).then((res)=>{
            dispatch({
                type: GET_CART_PRODUCT,
                payload:res.data
                
            });
        })
       
       

    } catch (err) {
            dispatch({
                type:FAIL_CART_PRODUCT
            })
    };


};








export const postcartproduct = (name,idproduct,description,price,quantity,image,user) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
           
        }
    };
    var done=0
    store.getState().cartproduct.cartproducts.forEach(element => {
       if(element.idproduct===idproduct && done===0){
                done=1
              
                const body=JSON.stringify({name,idproduct,description,image,price,quantity:element.quantity+1,user})
            
                axios.put(`${base_url}/api/cartproducts/${element.id}/`,body,config).then(()=>{
                    dispatch({
                        type: PUT_CART_PRODUCT_SUCCESS
                    
                        
                    });
                    dispatch(getcartproducts())
                    dispatch(showmsg(["Product quantity incremented","01AA10"]))

                    }).catch ((err) =>{
                    dispatch(showmsg(["ERROR","CA0F04"]))
                   
                    dispatch(getcartproducts())

                }
 
                )
               
    }
    });


 if (done===0){
    const body=JSON.stringify({name,idproduct,description,price,quantity,image,user})

 
     axios.post(`${base_url}/api/cartproducts/`,body,config).then(()=>{
            dispatch({
                type: POST_CART_PRODUCT_SUCCESS
            
                
            });
            dispatch(getcartproducts())
            dispatch(showmsg(["Product added to cart","01AA10"]))
           
  
        })
       
       .catch (() => {
        dispatch(showmsg(["Log or signup for using cart","CA0F04"]))
        }
       
       
       )
 }
  
    };
         


   
export const deletecartproduct = (id) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
           
        }
    };


 
    try {
        await axios.delete(`${base_url}/api/cartproducts/${id}/`,config).then(()=>{
            dispatch({
                type: DELETE_CART_PRODUCT_SUCCESS
             
            });
            dispatch(getcartproducts())
            dispatch(showmsg(["Product removed","01AA10"]))

           
        })
       
       

    } catch (err) {
        dispatch(showmsg(["Product removed failed","01AA10"]))

    };


};

   
export const increment = (id,name,description,image,price,quantity,user) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
           
        }
    };

    const body= JSON.stringify({name,description,image,price,quantity:quantity+1,user})


 
    try {
        await axios.put(`${base_url}/api/cartproducts/${id}/`,body,config).then(()=>{
            dispatch({
                type: INCREMENT
             
            });
            dispatch(getcartproducts())
           
        });
       
       

    } catch (err) {
        console.log(err)

    };

}


export const decrement = (id,name,description,image,price,quantity,user) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
           
        }
    };

    const body= JSON.stringify({name,description,image,price,quantity:quantity-1,user})


 
    try {
        await axios.put(`${base_url}/api/cartproducts/${id}/`,body,config).then((res)=>{
            if(res.data.quantity===0){
                dispatch(deletecartproduct(res.data.id))
                dispatch(getcartproducts())
            }
            
            dispatch({
                type: DECREMENT
             
            });
            dispatch(getcartproducts())
          
        });
       
       

    } catch (err) {
        console.log(err)

    };

}




export const showbox = (name,id,description,price,quantity,image,user_id,category) => async dispatch => {
   
                dispatch({
                    type:CLICKED_PRODUCT,
                    payload:{
                        name,
                        id,
                        description,
                        image,
                        quantity,
                        user_id,
                        category,
                        price
                    }
                })
         

}



export const show = () => async dispatch => {
   
    dispatch({
        type:SHOW_PRODUCT,
       
    })


}


export const showmsg = (data) => async dispatch => {
   
    dispatch({
        type:SHOW_MESSAGE,
        payload:data
       
    })


}