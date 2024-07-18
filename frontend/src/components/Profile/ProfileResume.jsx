import { useContext } from 'react';
import { ChevronRight, FolderClosed } from 'lucide-react';
import { capitalizeText } from '../../utils/capitalizeText';
import { newProfileImage } from '../../utils/user';

import UserContext from '../../contexts/UserContext';

const ProfileResume = () => {
    const { user, error, loading, refetchUser } = useContext(UserContext);

    const sendImage = async (e) => {
        const image = e.target.files[0];
        const isUpdated = await newProfileImage(image);

        if (isUpdated) refetchUser();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Erro</div>;
    }

    return (
        <section className='bg-black w-full h-auto min-h-profile px-4 py-10 flex flex-col gap-12 lg:h-profile lg:w-9/12 lg:max-h-profile lg:absolute lg:right-0 lg:top-32 lg:overflow-y-auto 2xl:w-10/12'>
            <section className='flex flex-col items-center gap-8 lg:flex-row lg:items-start'>
                <section className='w-full max-w-96 flex justify-center items-center lg:w-1/3 lg:max-w-60'>
                    {!user.photoUrl ?
                        <label className='bg-light text-white font-poppins p-2 flex flex-col gap-2 items-center rounded-md shadow-sm shadow-white cursor-pointer'>
                            <FolderClosed /> Adicione uma Foto
                            <input type="file" className='hidden' accept="image/*" onChange={sendImage} />
                        </label> :
                        <label className='flex justify-center cursor-pointer lg:block'>
                            <input type="file" className='hidden' accept="image/*" onChange={sendImage} />
                            <img src={`${user.photoUrl}`} alt={`Foto de perfil de`} className='w-1/2 aspect-square rounded-full border-2 border-white animate-rotate-y animate-ease-in-out lg:w-full' />
                        </label>
                    }
                </section>
                <section className='flex flex-col gap-8'>
                    <section className='flex flex-col gap-2'>
                        <h1 className='text-white text-center text-3xl font-poppins font-semibold lg:text-start'>{capitalizeText(user.name)}</h1>
                        <h2 className='text-opaque text-center text-lg font-poppins font-light lg:text-start'>@{user.username}</h2>
                        <h3 className='text-light text-center text-lg font-poppins font-light lg:text-start'>{capitalizeText(user.office)}</h3>
                    </section>
                    <section>
                        <p className='text-opaque text-center font-poppins lg:text-start'>
                            {user.bio}
                        </p>
                    </section>
                </section>
            </section>
            <section className='flex flex-col gap-6'>
                <section className='flex items-center'>
                    <h1 className='text-white text-2xl font-poppins lg:text-3xl'>HABILIDADES</h1>
                    <div className='bg-white flex-1 h-0.5'></div>
                </section>
                <section className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-12">
                    {user.skills.map(item =>
                        <section className='lg:w-3/12' key={item}>
                            <div className='text-white text-xl font-poppins'>{capitalizeText(item)}</div>
                            <div className='bg-white w-full h-1'>
                                <div className='bg-light w-10/12 h-1'></div>
                            </div>
                        </section>
                    )}
                </section>
            </section>
            <section className='flex flex-col gap-4'>
                <section className='flex items-center'>
                    <h1 className='text-white text-2xl font-poppins lg:text-3xl'>INTERESSES</h1>
                    <div className="bg-white flex-1 h-0.5"></div>
                </section>
                <section className='flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-6'>
                    {user.likes.map(item =>
                        <div className='text-white text-xl flex items-center font-poppins lg:w-3/12' key={item}>
                            <ChevronRight />{capitalizeText(item)}
                        </div>
                    )}
                </section>
            </section>
        </section>
    );
}

export default ProfileResume;