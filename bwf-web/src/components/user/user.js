import React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';


export default function User({user}) {

    return (

        <div>
            <Avatar alt="Avatar Image" src={"http://127.0.0.1:8000"+user.profile.image} sx={{ width: 75, height: 75 }} />
            <h4 className="username">{user.username}</h4>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string
        }).isRequired
    }).isRequired
}