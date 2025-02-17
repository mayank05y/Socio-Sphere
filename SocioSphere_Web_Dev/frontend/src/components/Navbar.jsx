import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserDetails } from '../redux/userSlice';

const Navbar = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserDetails());
    navigate('/login');
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">SocioSphere</Link>
      </div>
      <div className="flex-none">
        {userDetails ? (
          <>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-ghost">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;