import React, {useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKey from '@mui/icons-material/VpnKey';

function Register() {

  const { authData } = useAuth();
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [ email, setEmail ] = useState('')

  const passMatch = () => {
    return password === password2
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if(passMatch()){
        console.log('all good', username, password, email)
    }
    else {
        console.log('Password Doesnt Match')
    }
  }

  return (
    <div className="register">
        <Link to={'/'}>Back</Link>
        <h1>Register</h1>
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

    
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Repeat Password" variant="standard" type="password" 
            onChange={ e => setPassword2(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Email" variant="standard"
            onChange={ e => setEmail(e.target.value)}
          />
        </Box>
        <br/>

        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>
        <br/>

      </form>
    </div>
  )
}

export default Register;