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
    } catch (err) {
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
        bio: 'Ohayo! Meu nome é Gabriel, programador em Java e C',
        skills: ['HTML', 'CSS', 'JS', 'REACT', 'JAVA', 'PYTHON', 'TAILWIND'],
        likes: ['HTML', 'CSS', 'JS', 'REACT', 'NODE', 'GIT', 'GITHUB', 'TAILWIND'],
        posts: [
            {
                main: 'React Hooks são um recurso poderoso introduzido no React 16.8 que permitem o uso de estado e outras funcionalidades do React sem a necessidade de escrever uma classe. Eles possibilitam que componentes funcionais tenham estado, métodos de ciclo de vida e outras características que antes estavam disponíveis apenas para componentes de classe. Aqui estão alguns Hooks do React mais usados: useState: Permite que componentes funcionais gerenciem estado local.',
                image: 'https://miro.medium.com/v2/resize:fit:1200/1*JdkEvoNMusSGEuuqUZ0OLg.jpeg',
                repost: false,
                repostData: {}
            },
            {
                main: 'Spring Boot é uma estrutura poderosa baseada em Java que permite criar aplicativos de produção de forma rápida e com o mínimo de configuração. Uma das suas funcionalidades principais é a criação de APIs RESTful de forma simplificada. Abaixo está um guia básico para criar uma API usando Spring Boot:',
                image: 'https://miro.medium.com/v2/resize:fit:1400/1*XJxJjQnN4uyzLK0bEkpDZg.png',
                repost: false,
                repostData: {}
            },
            {
                main: '',
                image: '',
                repost: true,
                repostData: {
                    user: {
                        name: 'Davi Barbosa Cavalcante',
                        office: 'Frontend Developer',
                        photo: 'https://github.com/davibcavalcante.png',
                    },
                    main: 'O que é JavaScript? JavaScript é a linguagem de programação que dá vida às páginas da web! Com ele, você pode criar interatividade, animações e transformar sites estáticos em experiências dinâmicas e envolventes.',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0IaRDjBvZC4Ga4GfQPWxacgvFVTF1rlWUw&s',
                }
            }
        ],
    }
}

export { login, register, getUser };