import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import SinglePost from './components/SinglePost';
import Profile from './components/Profile';
import Settings from './components/Settings';
import PageNotFound from './components/404';
import NewPost from './components/NewPost';
import SavedPosts from './components/SavedPosts';
import Sidebar from './components/Sidebar';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/userSlice';

const { verifyToken } = require('./service/api');

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await verifyToken(token);
        if (user) {
          dispatch(setUserDetails(user));
          console.log(user);
        }
      }
    };
    checkUser();

    const initializeDefaultPosts = () => {
      const defaultPosts = [
        {
          id: 1,
          title: "Welcome to SocioSphere!",
          content: "This is a default post to get you started.",
          author: "Admin",
          date: Date.now(),
          likes: 1,
          dislikes: 0,
          comments: [],
          image: 'https://via.placeholder.com/600',
        },
      ];
      localStorage.setItem("posts", JSON.stringify(defaultPosts));
    };
  
    if (!localStorage.getItem("posts")) {
      initializeDefaultPosts();
    }
  }, [dispatch]);

  const hideSidebar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='max-w-screen'>
      <Navbar />
      <div className='flex'>
        {!hideSidebar && <Sidebar />}
        <div className='flex-grow'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post" element={<SinglePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/savedposts" element={<SavedPosts />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;