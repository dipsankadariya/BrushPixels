import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function OAuth() {
  const dispatch= useDispatch();
   const navigate=  useNavigate();

    const  handleGoogleClick =async()=>{
     
        try{
       const provider =new GoogleAuthProvider();
       const  auth = getAuth(app);
       const result =await  signInWithPopup(auth,provider);
       
       const response = await fetch('/api/auth/google',{
        method:'POST',
            headers:{
                'Content-Type'  :'application/json',
            },

            body:JSON.stringify({
              name:result.user.displayName,
              email:result.user.email,
              photo:result.user.photoURL,
            })
       });
       const data = await response.json();
       dispatch(signInSuccess(data));
       navigate('/profile');
        }
        catch(error){
            console.log("Could not login with google",error);
        }
    }
  return (
 
    <button  onClick={handleGoogleClick} type='button' className= "bg-red-600 text-white sm:mt-1 border border-none lack px-6 sm:px-8 py-2 sm:py-3 hover:bg-red-600 hover:text-white transition-colors font-light tracking-wide"  >CONTINUE  WITH  GOOGLE</button>
  )
}

export default OAuth;