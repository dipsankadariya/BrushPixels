import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        setMessage(data.error);
        setTimeout(() => setMessage(''), 4000);
        return;
      }

      setMessage('Signup successful! Redirecting to SignIn page.');
      setTimeout(() => {
        setMessage('');
        navigate('/sign-in');
      }, 1000); // 4-second delay before navigating

      setFormData({
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:mt-20 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Welcome to Brush Pixels</h1>
        <h2 className="font-mono text-lg sm:text-xl tracking-tight text-black/80">Sign up</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide">
          Sign Up
        </button>
      </form>

      <div>
        <p className="font-mono text-lg sm:text-xl tracking-tight text-black/80 mt-5">
          Already have an account? 
          <Link to="/sign-in">
            <span className="mx-3 font-mono text-lg sm:text-xl tracking-tight text-gray-700 hover:text-teal-500">Sign In</span>
          </Link>
        </p>
      </div>
      <div>
        <p className="mx-3 font-mono text-lg sm:text-xl tracking-tight text-red-700">{message}</p>
      </div>
    </div>
  );
}

export default Signup;
