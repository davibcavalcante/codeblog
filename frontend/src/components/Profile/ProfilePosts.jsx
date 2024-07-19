import useFetchUserPosts from "../../hooks/useFetchUserPosts";
import Post from "../Post";

const ProfilePosts = () => {
    const { user, error, loading, posts } = useFetchUserPosts();

    if (loading) return;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className='bg-black w-full h-auto min-h-profile px-4 py-10 flex flex-col gap-2 md:items-center lg:h-profile lg:w-9/12 lg:max-h-profile lg:absolute lg:right-0 lg:top-32 lg:overflow-y-auto 2xl:w-10/12'>
            {(posts && user) && posts.map((post, index) => 
                <Post key={index} user={user} post={post} index={index} postsLength={posts.length} /> 
            )}
        </section>
    );
}

export default ProfilePosts;