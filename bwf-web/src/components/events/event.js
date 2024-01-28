import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchEvent } from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';
import { DateTime } from 'luxon';
import User from '../user/user';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button, TextField } from '@mui/material';
import { placeBet, setResults } from '../../services/event-services';
import { NotificationManager } from 'react-notifications';

export default function Event({events}){

    const { authData } = useAuth();
    const { id } = useParams();
    const [ data, loading, error ] = useFetchEvent(authData.token, id);
    const [ event, setEvent ] = useState(null);
    const [ evtTime, setEvtTime ] = useState(null);
    const [ isFuture, setisFuture ] = useState(null);
    const [ timeDiff, setTimeDiff] = useState(null);
    const [ score1, setScore1 ] = useState(null);
    const [ score2, setScore2 ] = useState(null);

    useEffect(() => {
        setEvent(data);
        if(data?.time) {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            const eventTime = DateTime.fromFormat(data.time, format)
            setEvtTime(eventTime);
            const now = DateTime.now();
            setisFuture(eventTime > now);
            setTimeDiff(eventTime.toRelative());
        }
      }, [data])

    const sendBet = async () => {
        const bet = await placeBet(authData.token, {score1, score2, 'event': event.id})
        console.log(bet);
        if(bet){
            if(bet.new){
                event.bets.push(bet.results)
            }
            else {
                const myBetIndex = event.bets.findIndex(el => el.user.id === bet.results.user.id);
                event.bets[myBetIndex] = bet.results;
                
            }
            NotificationManager.success(bet.message)
            setScore1('');
            setScore2('');
        }
    }

    const setScore = async() => {
        const eventData = await setResults(authData.token, {score1, score2, 'event': event.id})
        if(eventData){
            setEvent(eventData);
            NotificationManager.success("Score has been set")
            setScore1('');
            setScore2('');
        } else {
            NotificationManager.error("Score could not be set")
        }

    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1> Loading...</h1>


    return (
        
       
        <React.Fragment>
            
            { event && evtTime &&
                <div>
                    <Link to={`/details/${event.group}`}>Back</Link>
                    <h3>{event.team1} VS {event.team2}</h3>
                    { event.score1 >= 0 && event.score2 >= 0 && 
                        <h2>{event.score1} : {event.score2}</h2>
                    }
                    <h2>
                        <CalendarTodayIcon color="primary" />{ evtTime.toSQLDate() } 
                        <AlarmIcon color="primary" />{ evtTime.toFormat('HH:mm') }
                    </h2>
                    <h2>{timeDiff}</h2>
                    <h3>Number of people already bet: {event.num_bets}</h3>
                    <hr/>
                    <br/>
                    { event.bets && event.bets.map(bet => {
                        return <div key={bet.id}>
                                    <TableContainer>
                                        <Table>
                                            <TableRow>
                                                <TableCell><User user={bet.user} /></TableCell>
                                                <TableCell><h4>{bet.score1} : {bet.score2} </h4></TableCell>
                                                <TableCell><h4>{bet.points} PTS</h4></TableCell>  
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                </div>
                            })}
                                <br/>
                                <br/>

                                { isFuture ?
                                    <div>
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
                                : event.is_admin ?
                                    <div>
                                        <TextField label="Score 1" type="number" 
                                        onChange={ e => setScore1(e.target.value)}
                                        />
                                        :
                                        <TextField label="Score 2" type="number" 
                                        onChange={ e => setScore2(e.target.value)}
                                        />
                                        <br/>
                                        <Button variant="contained" color="primary" onClick={() => setScore() } disabled={!score1 || !score2} >Set Score</Button> 
                                    </div> 
                                : null
                                    
                                }
                </div>
            }

        </React.Fragment>
        

    )

}