import { Link } from 'react-router-dom';
import { Menu, Instagram, Search } from 'lucide-react';
import { useContext, useState } from 'react';

import AsideContext from '../../utils/AsideContext';
import { getUser } from '../../utils/auth';

const Header = () => {
    const { toggleAside } = useContext(AsideContext);

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);

    const user = getUser();

    return (
        <header className='bg-main flex justify-between items-center p-4 h-20'>
            <section className='text-white'>
                <div className="lg:hidden">
                    <Menu size={35} onClick={toggleAside} />
                </div>
                <div className='hidden lg:block'>
                    <Instagram size={35} />
                </div>
            </section>
            <section className='sm: w-1/2'>
                <input type="text" className='bg-transparent border-2 border-white rounded-lg px-2 py-1 w-full' placeholder='Digite o que você procura'/>
            </section>
            <section>
                { !isLoggedIn &&
                    <div className='flex flex-col gap-1 md:flex-row md:gap-2 lg:gap-3 xl:gap-4'>
                        <Link to={'/login'} className='text-white border border-white rounded-lg px-2 py-1 block'>Sign-In</Link>
                        <Link to={'/login'} className='text-white bg-black rounded-lg px-2 py-1 block'>Sign-Up</Link>
                    </div>
                }

                {
                    isLoggedIn &&
                    <img src={`${user.photo}`} alt={`Foto de perfil de ${user.name}`} className='w-8 rounded-full md:w-9' />
                }
            </section>
        </header>
    );
}

export default Header;