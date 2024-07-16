import { freeApiFetch, authApiFetch } from "../axios/config";

const login = async (formData) => {
    try {
        const results = await freeApiFetch.post('/auth/login', formData);

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

const register = async (formData) => {
    try {
        const results = await freeApiFetch.post('/auth/register', formData);

        const token = await results.data.token;
        const userId = await results.data.userId

        localStorage.setItem('auth_token', JSON.stringify(token));
        localStorage.setItem('user_id', JSON.stringify(userId));

       return true
    } catch (err) {
        console.log('Não foi possível registrar o usuário', err);
        return false
    }
}

const getUser = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        const results = await authApiFetch.get(`/api/profiles/${userId}`);
        return results.data;
    } catch (err) {
        console.log(err)
    }
}

export { login, register, getUser };