import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchEvent } from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';
import { DateTime } from 'luxon';
import User from '../user/user';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, TextField } from '@mui/material';

export default function Event({events}){

    const { authData } = useAuth();
    const { id } = useParams();
    const [ data, loading, error ] = useFetchEvent(authData.token, id);
    const [ event, setEvent ] = useState(null);
    const [ evtTime, setEvtTime ] = useState(null);
    const [ score1, setScore1 ] = useState(null);
    const [ score2, setScore2 ] = useState(null);

    useEffect(() => {
        setEvent(data);
        if(data?.time) {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            setEvtTime(DateTime.fromFormat(data.time, format))
        }
      }, [data])

    const sendBet = () => {
        console.log(score1, score2);
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1> Loading...</h1>


    return (
        
       
        <React.Fragment>
            <div><Link to={'/'}>Back</Link></div>
            { event && evtTime &&
                <div>
                    <h3>{event.team1} VS {event.team2}</h3>
                    { event.score1 >= 0 && event.score2 >= 0 && 
                        <h2>{event.score1} : {event.score2}</h2>
                    }
                    <h2>
                        <CalendarTodayIcon color="primary" />{ evtTime.toSQLDate() } 
                        <AlarmIcon color="primary" />{ evtTime.toFormat('HH:mm') }
                    </h2>
                    <hr/>
                    <br/>
                    { event.bets && event.bets.map(bet => {
                        return <div key={bet.id}>
                                    <TableContainer>
                                        <Table>
                                            <TableRow>
                                                <TableCell><User user={bet.user} /></TableCell>
                                                <TableCell><h4>{bet.score1} : {bet.score2} </h4></TableCell>
                                                <TableCell><h4>PTS</h4></TableCell>  
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                <br/>
                                <TextField label="Score 1" type="number" 
                                    onChange={ e => setScore1(e.target.value)}
                                />
                                    :
                                <TextField label="Score 2" type="number" 
                                    onChange={ e => setScore2(e.target.value)}
                                />
                                <br/>
                                <Button variant="contained" color="primary" onClick={() => sendBet() } disabled={!score1 || !score2} >Place Bet</Button>
                            </div>
                            
                    }) }
                </div>
            }

        </React.Fragment>
        

    )

}