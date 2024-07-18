import axios from 'axios';

export const freeApiFetch = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    }
});

export const authApiFetch = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": JSON.parse(localStorage.getItem('auth_token'))
    }
});

export const authApiImage = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": JSON.parse(localStorage.getItem('auth_token'))
    }
});