import { Repeat2 } from "lucide-react";
import { getUser } from "../../utils/auth";

const ProfilePosts = () => {
    const { name, office, photo, posts } = getUser();

    return (
        <section className='bg-black w-full h-auto min-h-profile px-4 py-10 flex flex-col gap-12 lg:items-center lg:h-profile lg:w-9/12 lg:max-h-profile lg:absolute lg:right-0 lg:top-32 lg:overflow-y-auto 2xl:w-10/12'>
            {posts.map((item, index) =>
                <article className={`flex flex-col gap-4 pb-6 ${(index + 1) < posts.length ? 'border-b-2' : ''} border-white lg:max-w-screen-md lg:gap-6`} key={index}>
                    <section>
                        {!item.repost ? '' :
                            <p className="text-opaque font-poppins flex items-center gap-2">
                                <Repeat2 />{`${name} repostou`}
                            </p>
                        }
                    </section>
                    <section className="flex gap-4">
                        <img src={!item.repost ? photo : item.repostData.user.photo} alt={`Foto de perfil de ${name}`} className="w-12 rounded-full md:w-14" />
                        <section className="font-poppins flex-1">
                            <h1 className="text-white text-xl font-semibold md:text-2xl">{!item.repost ? name : item.repostData.user.name}</h1>
                            <h2 className="text-opaque text-sm font-light md:text-base">{!item.repost ? office : item.repostData.user.office}</h2>
                        </section>
                    </section>
                    <section className="flex flex-col gap-2">
                        <p className="text-white text-lg font-poppins font-light">{!item.repost ? item.main : item.repostData.main}</p>
                        <img src={!item.repost ? item.image : item.repostData.image} alt="" />
                    </section>
                </article>
            )}
        </section>
    );
}

export default ProfilePosts;