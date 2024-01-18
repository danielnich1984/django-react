import React from 'react';
import logo from '../../assets/logo.png'


function Header() {

  return (
    <div className="header">
      <img src={logo} alt="BWF Logo" height="150" />
    </div>
  )
}

export default Header;