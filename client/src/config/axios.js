// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance3' of it
export  const baseURL='http://localhost:80';
const HTTP = axios.create({
    baseURL
});


// Add a request interceptor
HTTP.interceptors.request.use(config => {
        const token=localStorage.getItem("currentUser");
        if (token) {
            config.headers['Authorization'] = JSON.parse(token).token;
        }
        if(!config.headers['Content-Type']){
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

HTTP.interceptors.response.use((response) => {return response}, function (error) {
    if (error.response.status === 401  || error.response.status === 403 ) {
        window.location.href="/login"
        return Promise.reject(error);
    }});
export default HTTP;