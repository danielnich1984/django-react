import React, {useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchGroup } from '../hooks/fetch-group';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';


function GroupDetails() {

  const { id } = useParams();
  const [data, loading, error ] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);

  useEffect(() => {
    setGroup(data);
  }, [data])

  if (error) return <h1>Error</h1>
  if (loading) return <h1> Loading...</h1>

    return (
        <div>
            <Link to={'/'}>Back</Link>
            { group &&
              <React.Fragment>
                <h1>{group.name} {group.location}</h1>
                <h2>{group.description}</h2>

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


              </React.Fragment>
            }
        </div>
    )
}

export default GroupDetails;
