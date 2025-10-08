import React, { useEffect, useState } from 'react';
import api from "../axios"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/auth/authThunk';
import OAuth from '../components/OAuth';


export default function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))

  };

  useEffect(() => {
    if(user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="hero bg-base-200 min-h-screen">
      {
          error && <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        }
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-2">
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                placeholder="Username"
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Password"
              />

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Register
              </button>

             
            </fieldset>
          </form>

           <OAuth />
        </div>
      </div>
    </div>
  );
}
