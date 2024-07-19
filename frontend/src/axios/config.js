import axios from 'axios';

export const apiFetch = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    }
});

export const apiFormDataFetch = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

apiFetch.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('auth_token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiFormDataFetch.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('auth_token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);