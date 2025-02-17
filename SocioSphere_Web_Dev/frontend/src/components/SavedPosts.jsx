import React, { useEffect, useState } from 'react';
import Post from './Post';
import { getSavedPosts } from '../service/api';
import './Home.css';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = getSavedPosts();
    setPosts(savedPosts);
  }, []);

  return (
    <div className='home-container pt-20 p-2 min-h-screen pb-10'>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
};

export default SavedPosts;