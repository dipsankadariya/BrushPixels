import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserFailure,
  updateUserSucess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSucess,
  signOut,
} from '../redux/user/userSlice';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchFollowCounts() {
      try {
        const response = await fetch(`/api/user/followers/count/${currentUser._id}`);
        const data = await response.json();
        if (data.success) {
          setFollowers(data.followersCount);
          setFollowing(data.followingCount);
        } else {
          console.log('Failed to fetch follow counts.');
        }
      } catch (error) {
        console.log('Failed to fetch follow counts.');
      }
    }

    if (currentUser) {
      fetchFollowCounts();
    }
  }, [currentUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message || 'Failed to update user.');
        dispatch(updateUserFailure(data));
      } else {
        dispatch(updateUserSucess(data));
        setSuccess(true);
      }
    } catch (error) {
      setError('Something went wrong.');
      dispatch(updateUserFailure(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        dispatch(deleteUserStart());
        const response = await fetch(`/api/user/delete/${currentUser._id}`, { 
          method: 'DELETE' 
        });
        const data = await response.json();
        if (!data.success) {
          dispatch(deleteUserFailure());
          return;
        }
        dispatch(deleteUserSucess());
        dispatch(signOut());
        window.location.href = '/sign-in';
      } catch (error) {
        dispatch(deleteUserFailure());
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:mt-10 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Profile</h1>
      </div>
      
      <div className="flex justify-around mb-8">
        <div>
          <h2 className="font-mono text-lg sm:text-xl">Followers</h2>
          <p className="text-black text-lg">{followers || 0}</p>
        </div>
        <div>
          <h2 className="font-mono text-lg sm:text-xl">Following</h2>
          <p className="text-black text-lg">{following || 0}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
          onChange={handleChange}
        />
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
          className="mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        {success && <p className="text-green-600 text-center mt-2">Profile updated successfully!</p>}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>

      <div className="flex justify-between mt-5">
        <span 
          onClick={handleDeleteAccount} 
          className="font-mono text-lg sm:text-xl text-red-700 cursor-pointer hover:underline"
        >
          Delete Account
        </span>
        <span 
          onClick={handleSignOut} 
          className="font-mono text-lg sm:text-xl text-gray-700 cursor-pointer hover:underline"
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;