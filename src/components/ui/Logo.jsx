import React from 'react';
import logo from '../../img/logo.png';

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Logo Iglesia"
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};

export default Logo;
