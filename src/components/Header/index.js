import React from 'react';
import WelcomeCard from './WelcomeCard';
import HeaderControls from './HeaderControls';

const Header = ({ user, onSearch, onNotificationClick }) => {
  return (
    <div className="flex items-center pt-[50.25px] flex-col-reverse lg:flex-row justify-between gap-[63.9px] mb-8">
      <WelcomeCard username={user.name} />
      <HeaderControls onSearch={onSearch} onNotificationClick={onNotificationClick} />
    </div>
  );
};

export default Header; 