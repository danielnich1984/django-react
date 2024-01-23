import React, {useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useFetchGroup } from '../../hooks/fetch-group';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';
import User from '../user/user';
import { joinGroup, leaveGroup } from '../../services/group-services';
import { useAuth } from '../../hooks/useAuth';
import Comments from '../comments/comments';

function GroupDetails() {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error ] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);
  const [ isGroup, setInGroup ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);


  useEffect(() => {

    if(data?.members){
      if(authData?.user){
        setInGroup(!!data.members.find( member => member.user.id === authData.user.id));
        setIsAdmin(!!data.members.find( member => member.user.id === authData.user.id)?.admin);
      }
    }
    setGroup(data);
  }, [data])

  const joinHere = () => {
    joinGroup({user: authData.user.id, group: group.id}).then(
      res => {console.log(res)}
    )
  }

  const leaveHere = () => {
    leaveGroup({user: authData.user.id, group: group.id}).then(
      res => {console.log(res)}
    )
  }

  if (error) return <h1>Error</h1>
  if (loading) return <h1> Loading...</h1>

    return (
        <div>
            <Link to={'/'}>Back</Link>
            { group &&
              <React.Fragment>
                <h1>{group.name} {group.location}</h1>
                <h2>{group.description}</h2>
                { isGroup ?
                  
                  <Button onClick={()=> leaveHere()} variant="contained" color="primary">Leave Group</Button>
                :
                  <Button onClick={()=> joinHere()} variant="contained" color="primary">Join Group</Button>
                }
                
                

                <h3>Events:</h3>
                { group.events.map ( event => {
                  
                  const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                  const evtTime = DateTime.fromFormat(event.time, format)
                  
                  return <div key={event.id}>
                      <p>{event.team1} VS {event.team2}</p>
                      <p>
                          <CalendarTodayIcon color="primary" />{ evtTime.toSQLDate() } 
                          <AlarmIcon color="primary" />{ evtTime.toFormat('HH:mm') }
                      </p>
                  </div>
                })}

                <br/>
                <h3>Members:</h3>
                { group.members.map ( member => {
      
                  
                  return <div key={member.id} className="memberContainer">
                    <User user={member.user} />
                    <p>{member.points}pts</p>
                  </div>
                })}

                <Comments group={group} />
              </React.Fragment>
            }
        </div>
    )
}

export default GroupDetails;
