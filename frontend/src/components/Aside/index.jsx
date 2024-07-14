import { useContext } from 'react';
import { Copyright } from 'lucide-react';
import { capitalizeText } from '../../utils/capitalizeText';

import AsideContext from '../../utils/AsideContext';
import AsideNav from './AsideNav';
import useFetchUser from '../../hooks/useFetchUser';

const Aside = () => {
    const { user, error, loading } = useFetchUser();
    const { isAsideOpen } = useContext(AsideContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <aside className={`bg-main w-10/12 min-h-aside py-8 duration-500 flex flex-col gap-8 absolute lg:top-20 lg:left-0 md:w-4/12 lg:w-3/12 2xl:w-2/12 ${isAsideOpen ? 'left-0' : '-left-full'} z-50`}>
            <nav>
                <AsideNav />
            </nav>
            <section className='flex-1'>
                <ul className='list-disc list-inside px-4 xl:px-6 xl:columns-2'>
                    {user.likes.map(item =>
                        <li className='text-white font-poppins mb-2' key={item}>{capitalizeText(item)}</li>
                    )}
                </ul>
            </section>
            <footer className='pt-4 px-4 border-t border-white xl:px-6'>
                <p className='text-white text-sm font-poppins'><Copyright className='inline' size={14} /> CodeBlog todos os direitos reservados</p>
            </footer>
        </aside>
    );
}

export default Aside;