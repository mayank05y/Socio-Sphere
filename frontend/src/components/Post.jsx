import React, { useState, useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { deletePost, deleteComment } from '../service/api';

const Post = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || {};
    setLiked(likedPosts[user.email]?.includes(post.id));
    setSaved(savedPosts[user.email]?.includes(post.id));
  }, [post.id, user.email]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

    if (liked) {
      setLikes(likes - 1);
      likedPosts[user.email] = likedPosts[user.email].filter(id => id !== post.id);
    } else {
      setLikes(likes + 1);
      likedPosts[user.email] = likedPosts[user.email] ? [...likedPosts[user.email], post.id] : [post.id];
    }

    setLiked(!liked);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    // Update the post in localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map(p => p.id === post.id ? { ...p, likes: liked ? likes - 1 : likes + 1 } : p);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleSave = () => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || {};

    if (saved) {
      savedPosts[user.email] = savedPosts[user.email].filter(id => id !== post.id);
    } else {
      savedPosts[user.email] = savedPosts[user.email] ? [...savedPosts[user.email], post.id] : [post.id];
    }

    setSaved(!saved);
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  };

  const handleAddComment = () => {
    const comment = {
      id: comments.length + 1,
      content: newComment,
      author: user.username,
      date: new Date().toISOString(),
    };
    setComments([...comments, comment]);
    setNewComment('');

    // Update the post in localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map(p => p.id === post.id ? { ...p, comments: [...p.comments, comment] } : p);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDelete = () => {
    deletePost(post.id);
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(post.id, commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <h2>{post.title}</h2>
        <p>by {post.author}</p>
        <ReactTimeAgo date={new Date(post.date).getTime()} locale="en" />
        {user.username === post.author && (
          <button onClick={handleDelete} style={{ marginLeft: 'auto', color: 'red' }}>Delete</button>
        )}
      </div>
      <div className='post-content'>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" style={{ width: '100%', marginTop: '10px' }} />}
        {post.video && <video src={post.video} controls style={{ width: '100%', marginTop: '10px' }} />}
      </div>
      <div className='post-footer'>
        <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'} ({likes})</button>
        <button onClick={toggleComments}>Comment</button>
        <button>Share</button>
        <button onClick={handleSave}>{saved ? 'Unsave' : 'Save'}</button>
      </div>
      {showComments && (
        <div className='comments'>
          {comments.map((comment, i) => (
            <div key={i} className='comment'>
              <p><strong>{comment.author}</strong>: {comment.content}</p>
              <ReactTimeAgo date={new Date(comment.date).getTime()} locale="en" />
              {(user.username === comment.author || user.username === post.author) && (
                <button onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: 'auto', color: 'red' }}>Delete</button>
              )}
            </div>
          ))}
          <div className='comment-form'>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;