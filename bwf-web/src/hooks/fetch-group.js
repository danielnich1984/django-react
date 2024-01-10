import { useState, useEffect } from 'react';
import { getGroup } from '../services/group-services';

export function useFetchGroup(groupId){
    const [ groups, setGroup ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {

        const getData = async () => {
            setLoading(true);
            const data = await getGroup(groupId);
            setGroup(data);
            setLoading(false)
        }
        getData();
    }, [groupId])

    return [groups, loading, error]
}

