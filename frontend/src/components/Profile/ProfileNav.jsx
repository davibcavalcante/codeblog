import { Link } from 'react-router-dom';

const ProfileNav = ({ pathname }) => {
    return (
        <nav className='bg-black w-full relative lg:absolute lg:w-9/12 lg:right-0 2xl:w-10/12 z-50'>
            <ul className='flex items-center gap-3 pt-4 pb-2 px-2 overflow-x-auto xl:px-6 xl:gap-8 2xl:justify-center'>
                <li>
                    <Link to={'/profile'} className={`text-sm font-poppins ${ pathname === '/profile' ? 'text-light' : 'text-white' } md:text-base lg:text-lg`}>PERFIL</Link>
                </li>
                <li>
                    <Link to={'/profile/posts'} className={`text-sm font-poppins ${ pathname === '/profile/posts' ? 'text-light' : 'text-white' } md:text-base lg:text-lg`}>PUBLICAÇÕES</Link>
                </li>
                <li>
                    <Link to={'/profile/repositories'} className={`text-sm font-poppins ${ pathname === '/profile/repositories' ? 'text-light' : 'text-white' } md:text-base lg:text-lg`}>REPOSITÓRIOS</Link>
                </li>
                <li>
                    <Link to={'/profile/saved'} className={`text-sm font-poppins ${ pathname === '/profile/saved' ? 'text-light' : 'text-white' } md:text-base lg:text-lg`}>COLEÇÕES</Link>
                </li>
                <li>
                    <Link to={'/profile/likes'} className={`text-sm font-poppins ${ pathname === '/profile/likes' ? 'text-light' : 'text-white' } md:text-base lg:text-lg`}>CURTIDAS</Link>
                </li>
            </ul>
            <div className='bg-white w-full h-0.5 absolute bottom-0 left-0'></div>
        </nav>
    );
}

export default ProfileNav;