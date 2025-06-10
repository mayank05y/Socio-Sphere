export const login = async (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem("token", JSON.stringify(user));
    return { user, token: JSON.stringify(user) };
  } else {
    throw new Error("Invalid email or password");
  }
};

export const signup = async (username, email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    throw new Error("Email already in use");
  }
  const newUser = { username, email, password, profilePhoto: 'https://via.placeholder.com/150', followers: 0, following: 0 };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("token", JSON.stringify(newUser));
  return { user: newUser, token: JSON.stringify(newUser) };
};

export const verifyToken = async (token) => {
  const user = JSON.parse(token);
  if (user) {
    return { user };
  } else {
    throw new Error("Invalid token");
  }
};

export const getDefaultPosts = () => {
  return JSON.parse(localStorage.getItem("posts")) || [];
};

export const addPost = (post) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  post.likes = post.likes || 0;
  post.comments = post.comments || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const getSavedPosts = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || {};
  const postIds = savedPosts[user.email] || [];
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return posts.filter(post => postIds.includes(post.id));
};

export const getUserPosts = (username) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return posts.filter(post => post.author === username);
};

export const deletePost = (postId) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.filter(post => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

export const deleteComment = (postId, commentId) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      post.comments = post.comments.filter(comment => comment.id !== commentId);
    }
    return post;
  });
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};