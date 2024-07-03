import { useContext } from 'react';
import { BadgeHelp, Home, Library, User } from 'lucide-react';

import AsideContext from '../utils/AsideContext';
import NavLinks from './NavLinks';

const Aside = () => {
    const { isAsideOpen } = useContext(AsideContext)

    const links = [
        { path: '/', icon: <Home/>, text: 'Página Inicial' },
        { path: '/profile', icon: <User/>, text: 'Perfil' },
        { path: '/forum', icon: <BadgeHelp/>, text: 'Fórum' },
        { path: '#', icon: <Library/>, text: 'Repositório' },
    ]

    return (
        <aside className={`bg-main w-10/12 h-aside py-8 duration-500 absolute md:w-4/12 lg:static lg:w-3/12 2xl:w-2/12 ${isAsideOpen ? 'left-0' : '-left-full'}`}>
            <nav>
                <ul>
                    { links.map(item => 
                        <NavLinks path={item.path} icon={item.icon} text={item.text} key={item.text} />
                    )}
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;