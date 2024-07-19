import { apiFetch } from "../axios/config";

export const postLogin = async (formData) => {
    try {
        const results = await apiFetch.post('/auth/login', formData);

        const token = await results.data.token;
        const userId = await results.data.userId

        localStorage.setItem('auth_token', JSON.stringify(token));
        localStorage.setItem('user_id', JSON.stringify(userId));

        return true
    } catch (err) {
        console.log(err);
        return false
    }
}

export const postRegister = async (formData) => {
    try {
        const results = await apiFetch.post('/auth/register', formData);

        const token = await results.data.token;
        const userId = await results.data.userId

        localStorage.setItem('auth_token', JSON.stringify(token));
        localStorage.setItem('user_id', JSON.stringify(userId));

       return true
    } catch (err) {
        console.log('Não foi possível registrar o usuário', err);
        return false
    }
};