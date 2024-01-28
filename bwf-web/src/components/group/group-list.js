import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getGroups } from '../../services/group-services';
import GroupListItem from './group-list-item';

function GroupList() {

const [ groups, setGroups ] = useState(null);
const [ loading, setLoading ] = useState(false);
const [ error, setError ] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await getGroups ()
      .then( data => {
        setGroups(data);
        setLoading(false);
      }).catch( e => {
        setError(true);
        setLoading(false);
      })
    }
    getData();
  }, [])

  if (error) return <h1>Error</h1>
  if (loading) return <h1> Loading...</h1>

  return (
    <div>
        { groups && groups.map(group => {
          return <GroupListItem key={group.id} group={group}/>
        })}
    </div>
  )
}

export default GroupList;
