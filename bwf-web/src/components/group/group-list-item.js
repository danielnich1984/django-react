import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function GroupListItem({group}) {

  const navigate = useNavigate();

  const groupClicked = groupID => {
    navigate(`details/${groupID}`);
  }

  return (
    <div>
      { group && 
        <div group={group} onClick={ () => groupClicked(group.id) }>
              <p>{group.name}: {group.location}</p> 
        </div>
      }
    </div>
  );
}

export default GroupListItem;
