import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:61589',
})

export default api;