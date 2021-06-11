import axios from 'axios'

const axiosInstance= axios.create(
                    {
                       baseURL:'https://fakestoreapi.com/' ,
                       headers: {
                        "Content-Type": "application/json",
                                               
                       
                    },
                })


export const axios_payment =axios.create({
    baseURL:"",
    

}) 

export default axiosInstance  