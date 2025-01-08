import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserFailure, updateUserSucess, updateUserStart } from '../redux/user/userSlice';
import { deleteUserStart, deleteUserFailure, deleteUserSucess } from '../redux/user/userSlice';
import { signOut } from '../redux/user/userSlice';
function Profile() {
 const { currentUser } = useSelector((state) => state.user);
 const [formData, setFormData] = useState({});
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(false);
 const fileRef = useRef(null);

 const dispatch = useDispatch();

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);
   setSuccess(false);
   try {
     dispatch(updateUserStart());
     const response = await fetch(`/api/user/update/${currentUser._id}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });
     const data = await response.json();
     if (data.success === false) {
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
  try {
    dispatch(deleteUserStart());
    const response = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success === false) {
      dispatch(deleteUserFailure());
      return;
    }
    dispatch(deleteUserSucess());
    dispatch(signOut()); // Add this line to clear Redux state
    window.location.href = '/sign-in'; // Force redirect to sign-in page
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

const  handleSignOut =async()=>{
   try{
      await fetch('api/user/signout',);
      dispatch(signOut());
   }
   catch(error){
    console.log(error);
   }
}

 return (
   <div className="max-w-md mx-auto px-2 sm:mt-10 sm:px-6">
     <div className="text-center mb-12 sm:mb-16">
       <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Profile</h1>
     </div>
     <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
       <input type="file" ref={fileRef} hidden accept="image/*" />
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
       <span onClick={handleDeleteAccount} className="font-mono text-lg sm:text-xl tracking-tight text-red-700 cursor-pointer hover:underline">
         Delete Account
       </span>
       <span onClick={handleSignOut} className="font-mono text-lg sm:text-xl tracking-tight text-gray-700 cursor-pointer hover:underline">
         Sign Out
       </span>
     </div>
   </div>
 );
}

export default Profile;