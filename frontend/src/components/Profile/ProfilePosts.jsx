import { useContext } from "react";
import { capitalizeText } from "../../utils/capitalizeText";

import UserContext from "../../contexts/UserContext";

const ProfilePosts = () => {
    const { user, error, loading, refetchUser } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!posts) {
        return <div>No user data available</div>;
    }

    console.log(user, posts)

    return (
        <section className='bg-black w-full h-auto min-h-profile px-4 py-10 flex flex-col gap-12 lg:items-center lg:h-profile lg:w-9/12 lg:max-h-profile lg:absolute lg:right-0 lg:top-32 lg:overflow-y-auto 2xl:w-10/12'>
            {posts.map((item, index) =>
                <article className={`flex flex-col gap-4 pb-6 ${(index + 1) < posts.length ? 'border-b-2' : ''} border-white lg:max-w-screen-md lg:gap-6`} key={index}>
                    <section className="flex gap-4">
                        <img src={user.photoUrl || 'https://github.com/davibcavalcante.png'} alt={`Foto de perfil de ${user.name}`} className="w-12 rounded-full md:w-14" />
                        <section className="font-poppins flex-1">
                            <h1 className="text-white text-xl font-semibold md:text-2xl">{user.name}</h1>
                            <h2 className="text-opaque text-sm font-light md:text-base">{capitalizeText(user.office)}</h2>
                        </section>
                    </section>
                    <section className="flex flex-col gap-2">
                        <p className="text-white text-lg font-poppins font-light">{item.content}</p>
                        <img src={item.imageUrl || 'https://github.com/davibcavalcante.png'} alt="" />
                    </section>
                </article>
            )}
        </section>
    );
}

export default ProfilePosts;