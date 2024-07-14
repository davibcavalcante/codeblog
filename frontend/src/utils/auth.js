import apiFetch from "../axios/config";

const login = async (formData) => {
    try {
        const results = await apiFetch.post('/auth/login', formData);

        const token = await results.data.token;
        const userId = await results.data.user_id

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
        const results = await apiFetch.post('/auth/register', formData);

        const token = await results.data.token;
        const userId = await results.data.user_id

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
        const token = JSON.parse(localStorage.getItem('auth_token'));
        const userId = JSON.parse(localStorage.getItem('user_id'));

        const results = await apiFetch.get(`/api/profiles/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return results.data;
    } catch (err) {
        console.log(err)
    }
}

export { login, register, getUser };