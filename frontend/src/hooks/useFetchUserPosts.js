import { useState, useEffect } from 'react';
import { getUserPosts } from '../api/posts';

const useFetchUserPosts = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const {postsData, userData} = await getUserPosts();
                setPosts(postsData);
                setUser(userData);
            } catch (error) {
                setError(error);
                console.error('Erro ao carregar posts do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    return { user, posts, error, loading };
};

export default useFetchUserPosts;