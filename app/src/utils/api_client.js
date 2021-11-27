import axios from 'axios';

const api_client = axios.create({
    baseURL: 'http://localhost:3333/'
});

export default api_client;