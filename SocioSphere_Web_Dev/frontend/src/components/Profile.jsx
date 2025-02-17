import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import { getUserPosts } from '../service/api';
import './Home.css';

const Profile = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userPosts = getUserPosts(userDetails.username);
    setPosts(userPosts);
  }, [userDetails.username]);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className='min-h-screen pt-20 w-full flex flex-col gap-8'>
      <p className='text-white text-4xl font-bold text-center'>YOUR PROFILE</p>
      <div className='mx-auto flex justify-center'>
        <div className='flex flex-col gap-5'>
          <div className='bg-base-200 p-4 flex flex-col gap-3'>
            <img src={userDetails.profilePhoto} alt="Profile" className='w-32 h-32 rounded-full mx-auto' />
            <p className='text-lg font-bold text-center'>{userDetails.username}</p>
            <p className='text-center'>Followers: {userDetails.followers}</p>
            <p className='text-center'>Following: {userDetails.following}</p>
          </div>
          <div className='flex flex-col gap-3 bg-base-200 rounded-lg p-4'>
            <p>Your Posts</p>
            {posts.map((post, i) => (
              <Post key={i} post={post} onDelete={handleDeletePost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;