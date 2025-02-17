import React, { useState } from 'react';
import { addPost } from '../service/api';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handlePost = () => {
    const post = {
      title,
      content,
      author: JSON.parse(localStorage.getItem("token")).username,
      date: Date.now(),
      likes: 0,
      dislikes: 0,
      comments: [],
      image,
      video,
    };
    addPost(post);
    setTitle('');
    setContent('');
    setImage(null);
    setVideo(null);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleVideoChange = (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='min-h-screen pt-20'>
      <p className='text-white text-4xl font-bold text-center'>NEW POST</p>
      <div className='flex flex-col gap-5 items-center bg-base-200 lg:w-[50%]'>
        <div className='flex flex-col gap-3'>
          <p>Title</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p>Content</p>
          <textarea
            placeholder="Type here"
            className="textarea textarea-lg textarea-bordered w-full max-w-xs"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p>Image</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className='flex flex-col gap-3'>
          <p>Video</p>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>
        <div className='w-full'>
          <button className="btn btn-primary w-full" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;