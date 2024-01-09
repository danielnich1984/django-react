import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material'


function Sidebar() {

  return (
    <div className="sidebar">
      <h1>Sidebar</h1>
      <Button color="primary" variant="contained">
        My Button
      </Button>
    </div>
  )
}

export default Sidebar;