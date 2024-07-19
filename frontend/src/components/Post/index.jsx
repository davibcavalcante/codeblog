import { capitalizeText } from "../../utils/capitalizeText";

// TODO: Criar modo de exibição para as imagens serem exibidas com todo o seu conteúdo

const Post = ({user, post, index, postsLength}) => {
    return (
        <article className={`w-full flex flex-col gap-4 px-4 py-6 ${(index + 1) < postsLength ? 'border-b' : ''} border-opaque md:max-w-screen-md lg:gap-6`} key={index}>
            <section className="flex gap-4">
                <img src={user.photoUrl} alt={`Foto de perfil de ${user.name}`} className="w-12 rounded-full md:w-14" />
                <section className="font-poppins flex-1">
                    <h1 className="text-white text-xl font-semibold md:text-2xl">{user.name}</h1>
                    <h2 className="text-opaque text-sm font-light md:text-base">{capitalizeText(user.office)}</h2>
                </section>
            </section>

            <section className="flex flex-col gap-2">
                <h1 className="text-white text-2xl font-poppins">{post.title}</h1>
                <p className="text-white text-lg font-poppins font-light">{post.content}</p>
                <section>
                    {post.photoUrl.length === 1 &&
                        <section>
                            <img src={post.photoUrl[0]} alt="" className="w-full h-auto max-h-post object-cover" />
                        </section>
                    }

                    {post.photoUrl.length === 2 &&
                        <section className="flex gap-2">
                            <section className="w-post h-auto max-h-post">
                                <img src={post.photoUrl[0]} alt="" className="w-full h-full object-cover" />
                            </section>
                            <section className="w-post max-h-post">
                                <img src={post.photoUrl[1]} alt="" className="w-full h-full object-cover" />
                            </section>
                        </section>
                    }

                    {post.photoUrl.length === 3 &&
                        <section className="flex gap-2">
                            <section className="w-post max-h-post">
                                <img src={post.photoUrl[0]} alt="" className="w-full h-full object-cover" />
                            </section>
                            <section className="w-post max-h-post flex flex-col gap-2">
                                <img src={post.photoUrl[1]} alt="" className="block w-full h-post object-cover" />
                                <img src={post.photoUrl[2]} alt="" className="block w-full h-post object-cover" />
                            </section>
                        </section>
                    }

                    {post.photoUrl.length === 4 &&
                        <section className="flex gap-2">
                            <section className="w-post max-h-post flex flex-col gap-2">
                                <img src={post.photoUrl[0]} alt="" className="block w-full h-post object-cover" />
                                <img src={post.photoUrl[2]} alt="" className="block w-full h-post object-cover" />
                            </section>
                            <section className="w-post max-h-post flex flex-col gap-2">
                                <img src={post.photoUrl[1]} alt="" className="block w-full h-post object-cover" />
                                <img src={post.photoUrl[3]} alt="" className="block w-full h-post object-cover" />
                            </section>
                        </section>
                    }
                </section>
            </section>

        </article>
    );
};

export default Post;