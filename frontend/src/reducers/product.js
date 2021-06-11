import {
  
    GET_PRODUCT,
     GET_PRODUCT_FAIL,
     FAIL_CART_PRODUCT,
    POST_CART_PRODUCT_SUCCESS,
    GET_CART_PRODUCT,
    DELETE_CART_PRODUCT_SUCCESS,
    INCREMENT,
    DECREMENT,
    PUT_CART_PRODUCT_SUCCESS,
    CLICKED_PRODUCT,
    SHOW_PRODUCT,
    SHOW_MESSAGE
} from '../actions/type';




const initialState ={
    state:[],
   cartproducts:[],
   box:{},
   show:false,
   message:{},
   msg:false
}


export function product(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_PRODUCT:
          
            return {
                ...state,
                state:payload
                
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state
            }

        case FAIL_CART_PRODUCT:
            return {
                ...state,
                cartproducts:[]

            }

        case POST_CART_PRODUCT_SUCCESS:
            
            return {
                ...state
            }
        case GET_CART_PRODUCT:
        
            return {
                ...state,
                cartproducts:payload
            }
        case DELETE_CART_PRODUCT_SUCCESS:

        return {
            ...state,
        }

        case INCREMENT:
            return {
                ...state
            }
        case DECREMENT:
            return {
                ...state
            }

        case PUT_CART_PRODUCT_SUCCESS:
            return {
                ...state
            }
        case CLICKED_PRODUCT:
            return {
                ...state,
                box:payload
            }
        
        case SHOW_PRODUCT:
            return {
                ...state,
                show:(!state.show)
            }
        case SHOW_MESSAGE:
            return {
                ...state,
                message:payload,
                msg:(!state.msg)
            }
        default: return state
    }
}