import apiFetch from "../axios/config";

const login = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
        email: form.email.value,
        password: form.password.value
    }

    try {
        const results = await apiFetch.post('/auth/login', formData);
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
        const results = await apiFetch.post('/auth/register', formData);
        console.log(results);
    } catch (err) {
        console.log('Não foi possível registrar o usuário', err);
    }
}

const getUser = () => {
    return {
        name: 'Gabriel Martins',
        office: 'Backend Developer',
        photo: 'https://github.com/martinsdevv.png',
        skills: ['HTML', 'CSS', 'JS', 'REACT', 'JAVA', 'PYTHON', 'TAILWIND'],
        likes: ['HTML', 'CSS', 'JS', 'REACT', 'NODE', 'GIT', 'GITHUB']
    }
}

export {login, register, getUser };