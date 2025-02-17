import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      dispatch(setUserDetails(res.user));
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      console.log('yes');
    }
  }, [userDetails]);

  return (
    <div className="hero min-h-screen bg-base-200 pt-20 lg:pt-0">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome to SocioSphere!</h1>
          <p className="py-6">
            Experience the excitement of real-time connections and stay up-to-date with the latest trends. Join our vibrant community of users and share your thoughts. From breaking news to personal updates, SocioSphere is your go-to platform.
            <br />
            <br />
            Sign up now and let your voice be heard! 🐦✨ #SocioSphere
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <Link to={"/"} className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
            <div className='flex flex-col items-center justify-center mt-6'>
              <span className="label-text-alt">Don't have an account yet?</span>
              <Link to={"/signup"} className="label-text-alt link link-hover text-md">Create new account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;