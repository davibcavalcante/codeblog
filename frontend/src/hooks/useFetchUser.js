import { useState, useEffect, useCallback } from 'react';
import { getUser } from '../utils/user';

const useFetchUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchTrigger, setFetchTrigger] = useState(0); // Estado para controlar quando a busca deve ser executada

    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const userData = await getUser();
            setUser(userData);
        } catch (error) {
            setError(error);
            console.error('Erro ao carregar dados do usuário:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchTrigger, fetchUser]);

    const refetchUser = () => {
        setFetchTrigger(prev => prev + 1);
    };

    return { user, error, loading, refetchUser };
};

export default useFetchUser;