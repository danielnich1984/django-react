import React from 'react';
import Comment from './comment';

function Comments({group}) {

    const getUser = userId => {
        return group.members.find(member => member.user.id === userId).user;
    }

    return (
        <div className="header">
            <hr/>
            <h1>Comments:</h1>
                {group.comments.map( comment => {
                    return <Comment comment={comment} user={getUser(comment.user)}/>
                })}
        </div>
    )
}

export default Comments;