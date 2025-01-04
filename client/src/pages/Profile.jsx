import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message || 'Failed to update profile.');
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:mt-10 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
        <input type="file" ref={fileRef} className="hidden" accept="image/*" />
        <div className="flex justify-center mb-4">
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        {success && <p className="text-green-600 text-center mt-2">Profile updated successfully!</p>}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
      <div className="flex justify-between mt-5">
        <span className="font-mono text-lg sm:text-xl tracking-tight text-red-700 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="font-mono text-lg sm:text-xl tracking-tight text-gray-700 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
