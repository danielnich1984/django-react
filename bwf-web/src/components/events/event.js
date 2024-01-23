import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchEvent } from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


export default function Event({events}){

    const { authData } = useAuth();
    const { id } = useParams();
    const [ data, loading, error ] = useFetchEvent(authData.token, id);
    const [ event, setEvent ] = useState(null);

    return (

        <React.Fragment>
            <div><Link to={'/'}>Back</Link></div>
            <h3>Event info:</h3>

        </React.Fragment>

    )

}