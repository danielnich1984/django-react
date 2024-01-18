import React, {useState} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { uploadAvatar } from '../../services/user-services';
import { changePass } from '../../services/user-services';
import { NotificationManager } from 'react-notifications';
import VpnKey from '@mui/icons-material/VpnKey';

export default function Account() {

  const { authData } = useAuth();
  const [ image, setImage ] = useState();
  const navigate = useNavigate();
  const [ oldPassword, setOldPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')

  const passMatch = () => {
    return newPassword === password2
  }

  const uploadFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('image', image, image.name);

    await uploadAvatar(authData.user.profile.id, uploadData);
  }

  const submitChangePass = async e => {
    e.preventDefault();
    if(passMatch()){
      const passData = await changePass({ old_password: oldPassword, new_password: newPassword }, authData.user.id);
      if(passData){
        NotificationManager.success("Password has been changed")
      }
    } 
    
    else {
      NotificationManager.warning('Passwords Do Not Match');
    }
  }


  return (
    <div className="register">
        <Link to={'/'}>Back</Link>
        <h1>Change Your Picture</h1>
        <form onSubmit={uploadFile}>
            <label>
                <p>Upload your Avatar</p>
                <TextField type='file' onChange={ e => setImage(e.target.files[0]) } />
            </label>
            <Button type="submit" variant="contained" color="primary">Upload File</Button>
        </form>
        <br/>
/       <h1>Change Your Password</h1>
        <form onSubmit={submitChangePass}>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKey sx={{ color: 'primary', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Old Password" variant="standard" type="password" 
              onChange={ e => setOldPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKey sx={{ color: 'primary', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="New Password" variant="standard" type="password" 
              onChange={ e => setNewPassword(e.target.value)}
            />
          </Box>

      
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKey sx={{ color: 'primary', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Repeat Password" variant="standard" type="password" 
              onChange={ e => setPassword2(e.target.value)}
            />
          </Box>
            
            <Button type="submit" variant="contained" color="primary">Change Password</Button>
        </form>
    </div>
  )
}
