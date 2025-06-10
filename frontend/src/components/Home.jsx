import React, { useEffect, useState } from 'react';
import Post from './Post';
import { IoAddOutline } from 'react-icons/io5';
import { getDefaultPosts } from '../service/api';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultPosts = getDefaultPosts();
    setPosts(defaultPosts);
  }, []);

  const handleAddPost = () => {
    navigate('/newpost');
  };

  return (
    <div className='home-container pt-20 p-2 min-h-screen pb-10'>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
      <button className='fixed-button' onClick={handleAddPost}>
        <IoAddOutline size={30} />
      </button>
    </div>
  );
};

export default Home;