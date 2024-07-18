import { Link } from 'react-router-dom';
import { Menu, Instagram, User } from 'lucide-react';
import { useContext } from 'react';

import AsideContext from '../../contexts/AsideContext';
import UserContext from '../../contexts/UserContext';

const Header = () => {
    const { toggleAside } = useContext(AsideContext);
    const { user, error, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Erro</div>;
    }

    return (
        <header className='bg-main flex justify-between items-center p-4 h-20 xl:px-6'>
            <section className='text-white'>
                <div className="lg:hidden">
                    <Menu size={35} onClick={toggleAside} />
                </div>
                <div className='hidden lg:block'>
                    <Instagram size={35} />
                </div>
            </section>
            <section className='sm: w-1/2'>
                <input type="text" className='bg-transparent text-white border-2 border-white rounded-lg px-2 py-1 w-full' placeholder='Digite o que você procura' />
            </section>
            <section>
                {!user ?
                    <div className='flex flex-col gap-1 md:flex-row md:gap-2 lg:gap-3 xl:gap-4'>
                        <Link to={'/login'} className='text-white border border-white rounded-lg px-2 py-1 block'>Sign-In</Link>
                        <Link to={'/register'} className='text-white bg-black rounded-lg px-2 py-1 block'>Sign-Up</Link>
                    </div> :
                    user.photoUrl ?
                        <Link to={'/profile'}>
                            <img src={`${user.photoUrl}`} alt={`Foto de perfil de ${user.name}`} className='w-8 h-8 rounded-full md:w-9 md:h-9' />
                        </Link> :
                        <Link to={'/profile'}>
                            <User size={30} className='bg-white text-main border border-white aspect-square rounded-full p-1' />
                        </Link>
                }
            </section>
        </header>
    );
}

export default Header;