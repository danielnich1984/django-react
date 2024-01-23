import React from 'react';
import User from '../user/user'

function Comment({comment, user}) {

  return (
    <div className="" >
        <User user={user} />
        <p>{comment.description}</p>
    </div>
  )
}

export default Comment;