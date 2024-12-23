import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='bg-blue-500 flex justify-between'>
        <h1 className='font-bold text-white p-6 text-2xl' >BrushPixels</h1>
        <div className='flex  px-6 items-center  text-white text-xl '>
            <ul className='flex gap-3'>
               <Link to='/'>Home</Link>
               <Link to='/about' >About</Link>
               <Link to='/Sign-n' >SignIn</Link>
            </ul>
        </div>
    </div>
  )
}

export default Header