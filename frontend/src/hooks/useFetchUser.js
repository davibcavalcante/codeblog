import { useState, useEffect } from 'react';
import { getUser } from '../utils/auth';

const useFetchUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                setError(error);
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    return { user, error, loading };
};

export default useFetchUser;