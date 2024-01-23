import React from 'react';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useNavigate } from 'react-router-dom';

export default function EventList({events}){

    const navigate = useNavigate()
    const openEvent = eventID => {
        navigate(`/event/${eventID}`)
    }

    return (

        <React.Fragment>
        <h3>Events:</h3>
            { events && events.map  ( event => {
            
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            const evtTime = DateTime.fromFormat(event.time, format)
            
            return <div key={event.id} onClick={() => openEvent(event.id) }>
                <p>{event.team1} VS {event.team2}
                    &nbsp;  :   &nbsp;
                    <CalendarTodayIcon color="primary" />{ evtTime.toSQLDate() } 
                    <AlarmIcon color="primary" />{ evtTime.toFormat('HH:mm') }
                </p>
            </div>
            })}
        </React.Fragment>

    )
}