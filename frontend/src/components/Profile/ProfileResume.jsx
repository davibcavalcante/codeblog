import { ChevronRight, ChevronUp } from 'lucide-react';
import { getUser } from '../../utils/auth';

const ProfileResume = () => {
    const user = getUser();

    return (
        <section className='bg-black w-full min-h-screen px-4 py-10 flex flex-col gap-12'>
            <section className='flex flex-col items-center gap-8'>
                <section className='w-full flex justify-center'>
                    <img src={`${user.photo}`} alt={`Foto de perfil de ${user.name}`} className='w-1/2 rounded-full border-2 border-white' />
                </section>
                <section className='flex flex-col gap-2'>
                    <h1 className='text-white text-center text-3xl font-poppins font-semibold'>{user.name}</h1>
                    <h2 className='text-white text-center text-xl font-poppins font-light'>{user.office}</h2>
                </section>
                <section>
                    <p className='text-opaque text-center font-poppins'>Ohayo! Meu nome é Gabriel, programador em Java e C</p>
                </section>
            </section>
            <section className='flex flex-col gap-6'>
                <section className='flex items-center'>
                    <h1 className='text-white text-2xl font-poppins'>HABILIDADES</h1>
                    <div className='bg-white flex-1 h-0.5'></div>
                </section>
                <section className='flex flex-col gap-6'>
                    { user.skills.map(item =>
                        <section key={item}>
                            <div className='text-white text-xl font-poppins'>{item}</div>
                            <div className='bg-white w-full h-1'>
                                <div className='bg-light w-10/12 h-1'></div>
                            </div>
                        </section>
                    )}
                </section>
            </section>
            <section className='flex flex-col gap-4'>
                <section className='flex items-center'>
                    <h1 className='text-white text-2xl font-poppins'>INTERESSES</h1>
                    <div className="bg-white flex-1 h-0.5"></div>
                </section>
                <section className='flex flex-col gap-2'>
                    { user.likes.map(item =>
                        <div className='text-white text-xl flex items-center font-poppins' key={item}>
                            <ChevronRight/>{item}
                        </div>
                    )}
                </section>
            </section>
        </section>
    );
}

export default ProfileResume;