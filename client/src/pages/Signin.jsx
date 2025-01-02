import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        dispatch(signInFailure(data.message || 'Invalid credentials'));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure('Something went wrong. Please try again.'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:mt-20 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Welcome to Brush Pixels</h1>
        <h2 className="font-mono text-lg sm:text-xl tracking-tight text-black/80">Sign In</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <OAuth></OAuth>
      </form>

      <div>
        <p className="font-mono text-lg sm:text-xl tracking-tight text-black/80 mt-5">
          Don't have an account?
          <Link to="/sign-up">
            <span className="mx-3 font-mono text-lg sm:text-xl tracking-tight text-gray-700 hover:text-teal-500">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
      {error && (
        <div>
          <p className="mx-3 font-mono text-lg sm:text-xl tracking-tight text-red-700 mt-4">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Signin;
