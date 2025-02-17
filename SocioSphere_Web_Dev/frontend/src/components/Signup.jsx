import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../service/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const res = await signup(username, email, password);
      localStorage.setItem("token", res.token);
      navigate("/home"); // Redirect to home page after successful signup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 pt-20 p-4">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">UserName</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              <Link to="#" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={signupUser}>Sign Up</button>
          </div>
          <p className="text-center pt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-hover">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;