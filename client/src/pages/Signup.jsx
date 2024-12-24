import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:mt-20 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Welcome to Brush Pixels</h1>
        <h2 className="font-mono text-lg sm:text-xl tracking-tight text-black/80">Sign up</h2>
      </div>
      <form className="flex flex-col gap-4 sm:gap-6">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"
        />
        <button className="mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;