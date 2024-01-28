import React, {useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetchGroup } from '../../hooks/fetch-group';
import User from '../user/user';
import { joinGroup, leaveGroup } from '../../services/group-services';
import { useAuth } from '../../hooks/useAuth';
import Comments from '../comments/comments';
import EventList from '../events/events-list'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function GroupDetails() {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error ] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);
  const [ isGroup, setInGroup ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if(data?.members){

      data.members.sort((a,b) => b.points - a.points)

      const availableTrophies = ['Gold', 'Silver', 'Bronze'];
      let currentTrophy = 0;
      data.members.map( (m, indx)  => {
        if(indx === 0){
          m.trophy = availableTrophies[currentTrophy];
        } else {
          if(m.points != data.members[indx -1].points){
            currentTrophy++;
          }
          if(currentTrophy < availableTrophies.length){
            m.trophy = availableTrophies[currentTrophy];
          }
        }

      })

      if(authData?.user){
        setInGroup(!!data.members.find( member => member.user.id === authData.user.id));
        setIsAdmin(!!data.members.find( member => member.user.id === authData.user.id)?.admin);
      }
    }
    setGroup(data);
  }, [authData.user, data])

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

  const addEvent = () => {
    navigate('/event-form/', {state: {group: group}})
  }


  if (error) return <h1>Error</h1>
  if (loading) return <h1> Loading...</h1>

    return (
        <div>
            { group &&
              <React.Fragment>
                <Link key={group.id} to={'/'}>Back</Link>
                <h1>{group.name} {group.location}</h1>
                <h2>{group.description}</h2>

                { isGroup ?
                  
                  <Button onClick={()=> leaveHere()} variant="contained" color="primary">Leave Group</Button>
                :
                  <Button onClick={()=> joinHere()} variant="contained" color="primary">Join Group</Button>
                }
                {isAdmin &&
                  <Button onClick={()=> addEvent()} variant="contained" color="primary">Add New Event</Button>
                } 

                
                <EventList events={group.events} />

                <br/>
                <h3>Members:</h3>
                { group.members.map ( member => {
      
                  
                  return <div key={member.id} className="memberContainer">
                    <User user={member.user} />
                    <p><EmojiEventsIcon />{member.trophy}</p>
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
