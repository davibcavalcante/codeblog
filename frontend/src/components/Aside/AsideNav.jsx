import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BadgeHelp, Home, Library, User } from 'lucide-react';

import AsideContext from '../../utils/AsideContext';

const AsideNav = () => {
    const { isAsideOpen } = useContext(AsideContext);

    useEffect(() => {
        if (isAsideOpen) {
            document.querySelector('body').style.overflow = 'hidden'
        }

        if (!isAsideOpen) {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [isAsideOpen]);

    const links = [
        { path: '/', icon: <Home />, text: 'Página Inicial' },
        { path: '/profile', icon: <User />, text: 'Perfil' },
        { path: '/forum', icon: <BadgeHelp />, text: 'Fórum' },
        { path: '#', icon: <Library />, text: 'Repositório' },
    ];

    return (
        <ul>
            {links.map(item =>
                <li className='p-4 lg:px-6 border-b-2 border-white' key={item.text}>
                    <Link to={item.path} className='text-white flex items-center gap-4'>{item.icon} {item.text}</Link>
                </li>
            )}
        </ul>
    );
}

export default AsideNav;