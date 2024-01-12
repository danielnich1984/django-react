import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKey from '@mui/icons-material/VpnKey';
import { auth } from '../services/user-services';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Sidebar() {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const {authData, setAuth} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault()
    const data = await auth({username, password})
    setAuth(data);
  }
  const logout = () => {
    setAuth(null);
  }

  return (
    <div className="sidebar">
      { !authData ?   
      <div>
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
          <br/>
          
        </form>
        <Link to ={'/register'}>Regiter here if you don't have an account yet.</Link>
      </div>
      : 
        <div>
          <p>{authData.user.username}</p> 
          <Button color="primary" variant="contained" onClick={()=> logout()}>
            Logout
          </Button>
        </div>
      
      }
    </div>
  )
}

export default Sidebar;