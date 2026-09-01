import React from 'react';
import logo from '../../assets/img/logo.png';

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Logo Iglesia"
      className="w-12 h-12 object-contain scale-125 origin-center"
    />
  );
};

export default Logo;
