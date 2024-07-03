import axios from 'axios';

const apiFetch = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    }
});

export default apiFetch