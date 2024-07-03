import {login, register } from '../utils/auth';
import { focusIn, focusOut } from '../utils/inputAnimate';

import { Link } from 'react-router-dom';

import InputLogin from "./InputLogin";
import ButtonLogin from "./ButtonLogin";
import ExternalLinks from "./ExternalLinks";
import Paragraph from "./Paragraph";

import { FaWhatsapp } from 'react-icons/fa'
import { Github, Twitter, Youtube, Instagram, RedoIcon } from 'lucide-react';

const LoginRegister = ({ action }) => {
    return (
        <section className="bg-black min-h-screen md:flex md:items-center md:justify-center">
            <section className="lg:flex lg:justify-evenly lg:items-baseline lg:w-full">
                <section className="bg-main h-screen p-4 flex flex-col justify-center items-center md:w-96 md:h-login md:relative md:border-animation md:rounded-xl lg:w-2/6">
                    <section className="flex flex-col gap-12 w-full max-w-96 z-50">
                        <h1 className="text-white text-5xl text-center font-poppins xl:text-7xl">
                            { action === 'login' ? 'Sign-in' : 'Sign-up'}
                        </h1>
                        <form autoComplete="on" className="w-full flex flex-col gap-12" onFocus={focusIn} onBlur={focusOut} onSubmit={action === 'login' ? login : register}>
                            <section className="flex flex-col gap-2">
                                <section className="flex flex-col gap-4">
                                    { action === 'register' &&
                                    <InputLogin type={'text'} placeholder={'Nome'} name={'name'} /> 
                                    }
                                    { action === 'register' &&
                                    <InputLogin type={'text'} placeholder={'Nick'} name={'nickname'} /> 
                                    }
                                    <InputLogin type={'email'} placeholder={'Email'} name={'email'} />
                                    <InputLogin type={'password'} placeholder={'Senha'} name={'password'} />
                                </section>
                                <section className="flex justify-end">
                                    { action === 'login' && <Link to="#" className="text-white text-sm font-poppins underline">Esqueci minha senha</Link> }
                                </section>
                            </section>
                            <section className="flex flex-col items-center gap-4">
                                { action === 'login' ? 
                                    <ButtonLogin className={'bg-white text-xl font-poppins w-full h-12 xl:hover:bg-black xl:hover:text-white xl:duration-300'}>
                                        Entrar
                                    </ButtonLogin> :
                                    <ButtonLogin className={'bg-white text-xl font-poppins w-full h-12 xl:hover:bg-black xl:hover:text-white xl:duration-300'}>
                                        Sign-up
                                    </ButtonLogin>
                                }
                                { action === 'login' && 
                                    <ButtonLogin className={'bg-black text-white text-xl font-poppins w-full h-12 flex items-center justify-center gap-4 xl:hover:bg-white xl:hover:text-black xl:duration-300'}>
                                        <Github /> Entrar com Github
                                    </ButtonLogin>
                                }
                            </section>
                            <section className="flex justify-center">
                                { action === 'login' ? 
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
                    <Paragraph>
                        Entre com a sua conta e aproveite o melhor da <span className="text-light">CodeBlog</span>
                    </Paragraph>
                    <div className="bg-white w-full h-1"></div>
                    <Paragraph>
                        Fique de olho em nossas redes sociais!
                    </Paragraph>
                    <section className="text-white flex justify-center gap-4">
                        <ExternalLinks path='#'>
                            <Instagram size={30} />
                        </ExternalLinks>
                        <ExternalLinks path='#'>
                            <Twitter size={30} />
                        </ExternalLinks>
                        <ExternalLinks path='#'>
                            <Youtube size={30} />
                        </ExternalLinks>
                        <ExternalLinks path='#'>
                            <FaWhatsapp size={30} />
                        </ExternalLinks>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default LoginRegister;