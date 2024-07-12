import apiFetch from "../axios/config";

const login = async (formData) => {
    try {
        const results = await apiFetch.post('/auth/login', formData);
        console.log(results)
    } catch (err) {
        console.log(err);
    }
}

const register = async (formData) => {
    try {
        const results = await apiFetch.post('/auth/register', formData);
        /*  TODO:
                - SALVAR (results.data) NO LOCALSTORAGE
                - REDIRECIONAR PARA A HOMEPAGE
        */
    } catch (err) {
        /* TODO: MOSTRAR NA TELA O ERRO */
        console.log('Não foi possível registrar o usuário', err);
    }
}

const getUser = () => {
    
}

export { login, register, getUser };