import { Link } from 'react-router-dom';

const NavLinks = ({ path, icon, text}) => {
    return (
        <section>
            <li className='pb-4 px-4'>
                <Link to={path} className='text-white font-poppins flex items-center gap-2'>
                    {icon}{text}
                </Link>
            </li>
            <div className='bg-white w-full h-0.5 mb-4'></div>
        </section>
    );
}

export default NavLinks;