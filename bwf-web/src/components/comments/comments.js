import React, { useState } from 'react';
import Comment from './comment';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { postComment } from '../../services/group-services';

function Comments({group}) {

    const { authData } = useAuth();
    const [ newComment, setNewComment ] = useState();
    

    const getUser = userId => {
        return group.members.find(member => member.user.id === userId).user;
    }
    
    const sendComment = () => {
        postComment(authData.token, newComment, group.id, authData.user.id)
            .then( resp => {
                setNewComment('');
                group.comments.unshift(resp);
            });
    }

    return (
        <div className="header">
            <hr/>
            <h1>Comments:</h1>

                <TextField 
                    label="New Comment"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    value={newComment}
                    onChange={ evt=>setNewComment(evt.target.value) }
                />
                <Button onClick={ ()=> sendComment() } disabled={!newComment} variant='contained' color='primary'>Send Comment</Button>
                <br/>
                <br/>

                {group.comments.map( comment => {
                    return <Comment comment={comment} user={getUser(comment.user)}/>
                })}
        </div>
    )
}

export default Comments;