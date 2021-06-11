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
} from '../actions/type';
 

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: {
        first_name:"Login",
    },
    logpage:false,
    regipage:false,
    settingpage:false,
    setcover:false
};


export default function auth(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }   
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }       
        case AUTHENTICATED_FAIL:
            return {
            ...state,
            isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: {first_name:"Login",}
            }
        case LOGIN_SUCCESS:
      
                localStorage.setItem('access', payload.access);
                localStorage.setItem('refresh', payload.refresh);
                return {
                    ...state,
                    isAuthenticated: true,
                    access: payload.access,
                    refresh: payload.refresh
                }
        
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
                return {
                        ...state,
                        access: null,
                        refresh: null,
                        isAuthenticated: false,
                        user:  {
                            first_name:"Login"
                        }
                    }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
                return {
                        ...state
                    }
        case LOGIN_PAGE:
            return {
                ...state,
                logpage: (!state.logpage)
            }

        case REGISTRATION_PAGE:
            return {
                ...state,
                regipage: (!state.regipage)
            }
        case SETTING_PAGE:
            return {
                ...state,
                settingpage: (!state.settingpage)
            }
        case SET_COVER:
            return {
                ...state,
                setcover: (!state.setcover)
            }
        default:
                return state
        }
    };