import { Link } from 'react-router-dom';

const ProfileNav = ({ pathname }) => {
    return (
        <nav className='bg-black w-full relative'>
            <ul className='flex items-center gap-3 pt-4 pb-2 px-2 overflow-x-auto'>
                <li>
                    <Link to={'/profile'} className={`text-sm font-poppins ${ pathname === '/profile' ? 'text-light' : 'text-white' }`}>PERFIL</Link>
                </li>
                <li>
                    <Link to={'/profile/posts'} className={`text-sm font-poppins ${ pathname === '/profile/posts' ? 'text-light' : 'text-white' }`}>PUBLICAÇÕES</Link>
                </li>
                <li>
                    <Link to={'/profile/repositories'} className={`text-sm font-poppins ${ pathname === '/profile/repositories' ? 'text-light' : 'text-white' }`}>REPOSITÓRIOS</Link>
                </li>
                <li>
                    <Link to={'/profile/saved'} className={`text-sm font-poppins ${ pathname === '/profile/save' ? 'text-light' : 'text-white' }`}>COLEÇÕES</Link>
                </li>
                <li>
                    <Link to={'/profile/likes'} className={`text-sm font-poppins ${ pathname === '/profile/likes' ? 'text-light' : 'text-white' }`}>CURTIDAS</Link>
                </li>
            </ul>
            <div className='bg-white w-full h-0.5 absolute bottom-0 left-0'></div>
        </nav>
    );
}

export default ProfileNav;