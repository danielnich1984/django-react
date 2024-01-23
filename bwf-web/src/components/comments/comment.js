import React from 'react';
import User from '../user/user'
import theme from '../../theme';


function Comment({comment, user}) {

  return (
    <div className={theme.container} >
        <User user={user} />
        <div className="dialogBox">
          <span className="tip">&nbsp;</span>
          <div className="bodyMessage">
              <span>{comment.description}</span>
          </div>
        </div>
    </div>
  )
}

export default Comment;