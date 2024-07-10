import { useContext, useEffect } from 'react';
import { BadgeHelp, Copyright, Home, Library, User } from 'lucide-react';

import AsideContext from '../../utils/AsideContext';
import AsideNav from './AsideNav';
import { getUser } from '../../utils/auth';

const Aside = () => {
    const { isAsideOpen } = useContext(AsideContext);

    useEffect(() => {
        if (isAsideOpen) {
            document.querySelector('body').style.overflow = 'hidden'
        }

        if (!isAsideOpen) {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [isAsideOpen]);

    const user = getUser();

    const links = [
        { path: '/', icon: <Home />, text: 'Página Inicial' },
        { path: '/profile', icon: <User />, text: 'Perfil' },
        { path: '/forum', icon: <BadgeHelp />, text: 'Fórum' },
        { path: '#', icon: <Library />, text: 'Repositório' },
    ];

    return (
        <aside className={`bg-main w-10/12 min-h-aside py-8 duration-500 flex flex-col gap-8 absolute lg:top-20 lg:left-0 md:w-4/12 lg:w-3/12 2xl:w-2/12 ${isAsideOpen ? 'left-0' : '-left-full'} z-50`}>
            <nav>
                <ul>
                    {links.map(item =>
                        <AsideNav path={item.path} icon={item.icon} text={item.text} key={item.text} />
                    )}
                </ul>
            </nav>
            <section className='flex-1'>
                <ul className='list-disc list-inside columns-2 px-4 xl:px-6'>
                    {user.likes.map(item =>
                        <li className='text-white font-poppins mb-2' key={item}>{item}</li>
                    )}
                </ul>
            </section>
            <footer className='pt-4 px-4 border-t border-white xl:px-6'>
                <p className='text-white text-sm font-poppins'><Copyright className='inline' size={14}/> CodeBlog todos os direitos reservados</p>
            </footer>
        </aside>
    );
}

export default Aside;