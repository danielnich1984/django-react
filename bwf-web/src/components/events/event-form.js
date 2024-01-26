import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CssTextField } from '../layout/elements';
import { Button } from '@mui/material';
import { DateTime } from 'luxon';
import { createEvent } from '../../services/event-services';
import { useAuth } from '../../hooks/useAuth';
import { NotificationManager } from 'react-notifications'


export default function EventForm() {

    const { authData } = useAuth();
    const state = useLocation();
    const group = state.state.group
    const navigate = useNavigate();
    const [ team1, setTeam1 ] = useState();
    const [ team2, setTeam2 ] = useState();
    const [ time, setTime ] = useState();
 
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(team1, team2, time);
        const format = "yyyy-MM-dd'T'HH:mm";
        const utcTime = DateTime.fromFormat(time, format).toUTC().toFormat(format)
        const dataToSend = {team1, team2, 'time': utcTime, 'group': group.id};
        const eventData = await createEvent(authData.token, dataToSend);
        if(eventData){
            NotificationManager.success("Event Created")
            navigate('/details/'+group.id)
        }
        else {
            NotificationManager.success("Error Creating Event. Please Try Again Later.")
        }
    }

    return (
        <div>
            <h1>New Event for Group {group.id}</h1>
            <form onSubmit={handleSubmit}>
                <CssTextField label="Team 1" onChange={e => setTeam1(e.target.value)} />
                <CssTextField label="Team 2" onChange={e => setTeam2(e.target.value)} />
                <br/><br/><br/>
                <CssTextField
                    id="datetime-local"
                    label="Date and time of event"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setTime(e.target.value)} 
                />
                <br/><br/><br/>
                

                <Button variant="contained" color="primary" type="submit"> Create Event</Button>
            </form>
        </div>
    )
}