import axios from '../axios.js';
import { getcartproducts,showmsg } from './product.js';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGIN_PAGE,
    REGISTRATION_PAGE,
    SETTING_PAGE,
    SET_COVER,
    LOGOUT
} from './type';

var base_url='http://127.0.0.1:8000'


export const login = (email,password) => async dispatch => {
        const config = {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({email,password});

        try {
            const res=await axios.post(`${base_url}/auth/jwt/create/`,body,config)
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
            dispatch(getcartproducts());
            dispatch(setcover());
            dispatch(loginpage());
            dispatch(showmsg(["You are logged in","01AA10"]))

        } catch (err) {
            dispatch({
                type:LOGIN_FAIL
            })
           
            if(err.response.data){
            for(var key in err.response.data){
                dispatch(showmsg([key.toUpperCase() +" - " +err.response.data[key],"CA0F04"]))
                break;
            }
        }

        };


};



export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${base_url}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};




export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${base_url}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};



export const signup = (email,first_name, last_name, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name,email,  password, re_password });

       axios.post(`${base_url}/auth/users/`, body, config).then((res)=>{
       
           dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
  
        dispatch(loginpage())
        dispatch(registrationpage())
        dispatch(showmsg(["Check your e-mail for activating account","01AA10"]))

       })

        .catch( (err)=> {
         
            console.log(err.response.data)
        dispatch({
            type: SIGNUP_FAIL
        })
        for(var key in err.response.data){
            dispatch(showmsg([key.toUpperCase() +" - " +err.response.data[key],"CA0F04"]))
            break;
        }
      
    }
        )
    
};


export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${base_url}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

    
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
  
    }
};


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });

    try {
        await axios.post(`${base_url}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};


export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${base_url}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const loginpage = () => (dispatch) => {
      dispatch({
         type: LOGIN_PAGE
      })   
};
export const registrationpage = () => (dispatch) => {
    dispatch({
       type: REGISTRATION_PAGE
    })   
};
export const settingpage = () => (dispatch) => {
    dispatch({
       type: SETTING_PAGE
    })   
};

export const setcover = () => (dispatch) => {
    dispatch({
       type:SET_COVER
    })   
};
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(showmsg(["You are logged out","CA0F04"]))

};
