import axios from 'axios';

const instance = axios.create({
    // .. where we make our configurations
        baseURL: process.env.REACT_APP_BE_URL
    });
    
export default instance;