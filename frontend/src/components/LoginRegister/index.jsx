import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { postLogin, postRegister } from '../../api/auth';
import { focusIn, focusOut } from '../../utils/inputAnimate';
import { genericTags, officeTags } from '../../utils/tags';

import { FaWhatsapp } from 'react-icons/fa'
import { Github, Twitter, Youtube, Instagram, ArrowRight, ArrowLeft } from 'lucide-react';

import LoginRegisterInput from "./LoginRegisterInput";
import LoginRegisterButton from "./LoginRegisterButton";
import DataList from './DataList';

const LoginRegister = ({ action }) => {
    const navigate = useNavigate();

    const [officeSelected, setOfficeSelected] = useState('selecione');
    const [skillsSelected, setSkillsSelected] = useState([]);
    const [likesSelected, setLikesSelected] = useState([]);
    const [lastStep, setLastStep] = useState(false);

    const setButtonMode = () => {
        setLastStep(!lastStep);
    }

    const sendLoginData = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        const isLoggedIn = await postLogin(formData);
        if (isLoggedIn) navigate('/profile');
    }

    const sendRegisterData = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            username: e.target.nickname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            bio: e.target.bio.value,
            office: officeSelected,
            photo_url: '',
            skills: skillsSelected.map(item => item.value),
            likes: likesSelected.map(item => item.value)
        }

        const isRegistered = await postRegister(formData);
        if (isRegistered) navigate('/profile');
    }

    return (
        <section className="bg-black min-h-screen md:flex md:items-center md:justify-center">
            <section className="lg:flex lg:justify-evenly lg:items-baseline lg:w-full">
                <section className="bg-main h-screen p-4 flex flex-col items-center md:w-96 md:h-login md:relative md:border-animation md:rounded-xl lg:w-2/6 lg:pt-20">
                    <section className="flex flex-col gap-12 w-full h-full max-w-96 z-50">
                        <h1 className="text-white text-5xl text-center font-poppins xl:text-7xl">
                            {action === 'login' ? 'Sign-in' : 'Sign-up'}
                        </h1>
                        <form autoComplete="on" className="w-full flex flex-col gap-12 m-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-black scrollbar-thumb-gray" onFocus={focusIn} onBlur={focusOut} onSubmit={action === 'login' ? sendLoginData : sendRegisterData}>
                            <section className={`flex ${action === 'login' ? 'flex-col' : ''} gap-2 ${lastStep ? 'translate-register' : ''} duration-300`}>
                                <section className="flex flex-col gap-4 min-w-full">
                                    {action === 'register' &&
                                        <LoginRegisterInput type={'text'} placeholder={'Nome'} name={'name'} />
                                    }
                                    {action === 'register' &&
                                        <LoginRegisterInput type={'text'} placeholder={'Nick'} name={'nickname'} />
                                    }
                                    <LoginRegisterInput type={'email'} placeholder={'Email'} name={'email'} />
                                    <LoginRegisterInput type={'password'} placeholder={'Senha'} name={'password'} />
                                </section>
                                <section className="flex justify-end">
                                    {action === 'login' &&
                                        <Link to="#" className="text-white text-sm font-poppins underline">Esqueci minha senha</Link>
                                    }
                                </section>
                                {action === 'register' && lastStep &&
                                    <section className='flex flex-col gap-4 min-w-full'>
                                        <textarea name="bio" className='bg-transparent text-white border-2 border-white rounded-xl w-full min-h-32 py-2 px-4 outline-none' placeholder='Digite sua biografia'></textarea>
                                        <DataList saveOptions={setOfficeSelected} optionsTags={officeTags} placeholder={'Cargo:'} type="single" />
                                        <DataList saveOptions={setSkillsSelected} optionsTags={genericTags} placeholder={'Habilidades:'} type="multi" />
                                        <DataList saveOptions={setLikesSelected} optionsTags={genericTags} placeholder={'Interesses:'} type="multi" />
                                    </section>
                                }
                            </section>
                            <section className="flex flex-col items-center gap-4">
                                {action === 'login' &&
                                    <LoginRegisterButton className={'bg-white text-xl font-poppins w-full h-12 xl:hover:bg-black xl:hover:text-white xl:duration-300'} type={'submit'}>
                                        Entrar
                                    </LoginRegisterButton>
                                }

                                {action === 'register' &&
                                    <LoginRegisterButton className={`bg-white text-xl font-poppins h-12 aspect-square rounded-full flex items-center justify-center xl:hover:bg-black xl:hover:text-white xl:duration-300`} type='button' funct={setButtonMode}>
                                        {lastStep ? <ArrowLeft /> : <ArrowRight />}
                                    </LoginRegisterButton>
                                }

                                {action === 'register' && lastStep &&
                                    <LoginRegisterButton className={`bg-white text-xl font-poppins w-full rounded-sm h-12 aspect-square flex items-center justify-center xl:hover:bg-black xl:hover:text-white xl:duration-300`} type='submit'>
                                        Sign-Up
                                    </LoginRegisterButton>
                                }

                                {action === 'login' &&
                                    <LoginRegisterButton className={'bg-black text-white text-xl font-poppins w-full h-12 flex items-center justify-center gap-4 xl:hover:bg-white xl:hover:text-black xl:duration-300'}>
                                        <Github /> Entrar com Github
                                    </LoginRegisterButton>
                                }
                            </section>
                            <section className="flex justify-center">
                                {action === 'login' ?
                                    <span className="text-opaque font-poppins">É novo por aqui? <Link to="/register" className="text-white underline">Criar conta</Link></span> :
                                    <span className="text-opaque font-poppins">Já possui uma conta? <Link to="/login" className="text-white underline">Entre</Link></span>
                                }
                            </section>
                        </form>
                    </section>
                </section>
                <section className="hidden lg:flex flex-col gap-6 lg:w-2/6">
                    <h1 className="text-white font-poppins text-6xl tracking-in-expand-fwd xl:text-7xl 2xl:text-8xl">
                        <span className="font-thin">Olá,</span> <br />
                        <span>Bem Vindo</span>
                    </h1>
                    <p className="text-white text-xl font-poppins 2xl:text-2xl">
                        Entre com a sua conta e aproveite o melhor da <span className="text-light">CodeBlog</span>
                    </p>
                    <div className="bg-white w-full h-1"></div>
                    <p className="text-white text-xl font-poppins 2xl:text-2xl">
                        Fique de olho em nossas redes sociais!
                    </p>
                    <section className="text-white flex justify-center gap-4">
                        <Link to={'#'}> <Instagram size={30} /> </Link>
                        <Link to={'#'}> <Twitter size={30} /> </Link>
                        <Link to={'#'}> <Youtube size={30} /> </Link>
                        <Link to={'#'}> <FaWhatsapp size={30} /> </Link>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default LoginRegister;