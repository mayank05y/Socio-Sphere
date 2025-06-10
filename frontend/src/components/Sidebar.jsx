import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/savedposts')}>Saved Posts</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
    </div>
  );
};

export default Sidebar;