import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from '~/utils/formatters.js';
//khởi tạo 1 đối tượng axios để cấu hình chung cho cả project
let authorizedAxiosInstance = axios.create()

//thời gian chờ tối đa của 1 req: 10min
authorizedAxiosInstance.defaults.timeout = 10 * 60 * 1000

//withCredentials: cho phep gửi cookie từ client sang server
authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use( (config) => {
    //kĩ thuật chặn spam click
    interceptorLoadingElements(true);
    return config;
  },  (error) => {

 let errorMsg  = error?.message;
    if( error.message?.data?.message ) {
        errorMsg = error.message.data.message;
    }

    if( error?.response?.status !== 410 ) {
        toast.error(errorMsg);
    }
    return Promise.reject(error);
  });

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use( (response) => {
        //kĩ thuật chặn spam click
    interceptorLoadingElements(false);
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
     //kĩ thuật chặn spam click
    interceptorLoadingElements(false);

    let errorMsg  = error?.message;
    if( error.message?.data?.message ) {
        errorMsg = error.message.data.message;
    }

    if( error?.response?.status !== 410 ) {
        toast.error(errorMsg);
    }
    return Promise.reject(error);
  });

export default authorizedAxiosInstance 