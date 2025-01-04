import React from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
   const fileRef = useRef(null)
  return (
    <div className="max-w-md mx-auto px-2 sm:mt-10 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Profile</h1>
      </div>
      <form className="flex flex-col gap-2 sm:gap-4">
        <input type='file' ref={fileRef} className='hidden'  accept='image/*'></input>
        <div className="flex justify-center mb-4">
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover cursor-pointer"
            onClick={()=>fileRef.current.click()}
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <button
          type="submit"
          className="mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide"
        >
          Update
        </button>
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
