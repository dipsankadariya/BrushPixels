import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white border-b border-black">
      <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto py-4 px-4 md:py-6 md:px-6">
        <h1 className="font-mono text-black text-xl md:text-2xl tracking-tight">
          BrushPixels
        </h1>
        <ul className="flex flex-wrap gap-6 md:gap-12 text-sm md:text-base font-light tracking-wider uppercase">
          <Link to="/" className="group">
            <li className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
              Home
            </li>
          </Link>
          <Link to="/about" className="group">
            <li className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
              About
            </li>
          </Link>


           {/* Link to the 'Upload Artwork' page */}
           {currentUser && (
            <Link to="/uploadartwork" className="group">
              <li className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
                Upload Artwork
              </li>
            </Link>
          )}
              
                 {/* Link to the 'Upload Artwork' page */}
           {currentUser && (
            <Link to="/dashboard" className="group">
              <li className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
                Dashboard
              </li>
            </Link>
          )}


          {/* Show 'Sign In' or profile picture if user is signed in */}
          <Link to="/profile" className="group">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
                Sign In
              </li>
            )}
          </Link>

         
        </ul>
      </div>
    </div>
  );
}

export default Header;
