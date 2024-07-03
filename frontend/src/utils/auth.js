import apiFetch from "../axios/config";

const login = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
        email: form.email.value,
        password: form.password.value
    }

    try {
        const results = await apiFetch.post('/auth/login', {
            body: formData
        });
        console.log(results)
    }  catch (err) {
        console.log(err);
    }
}

const register = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
        name: form.name.value,
        username: form.nickname.value,
        email: form.email.value,
        password: form.password.value
    }

    try {
        console.log(formData)
        const results = await apiFetch.post('/auth/register', {
            body: formData
        });
        console.log(results);
    } catch (err) {
        console.log('Não foi possível registrar o usuário', err);
    }
}

export {login, register};