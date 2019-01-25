import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
    // creating a axios instance for connecting APIs
}); 

export default instance;  