import apiFetch from "../axios/config";

const login = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
        email: form.email.value,
        password: form.password.value
    }

    console.log(formData);
    const results = await apiFetch.post('/auth/login', {
        body: formData
    });
}

export default login;