import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKey from '@mui/icons-material/VpnKey';
import { auth } from '../services/user-services';

function Sidebar() {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const authData = await auth({username, password})
    console.log(authData);
  }

  return (
    <div className="sidebar">
      <form onSubmit={ handleSubmit }>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Username" variant="standard" 
            onChange={ e => setUsername(e.target.value)}
          />
          
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Password" variant="standard" type="password" 
            onChange={ e => setPassword(e.target.value)}
          />
        </Box>


        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Sidebar;