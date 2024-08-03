import React from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from './supabase';

export default function Logout() {
 
    const returnHome = useNavigate()

     const logout = async () => {

      const { error } = await supabase.auth.signOut()
         
      if(error){
        console.log(error)
      }
    
      returnHome("/")
     }
  return (
    <div className='h-screen flex justify-center items-center'>
       <div>

         <h1 className='p-4 text-2xl'>you're logged in</h1>
         
         <div className='bg-red-500'>
              <button className='w-full text-white border p-4 bg-black' onClick={logout}>logout</button>
         </div>
         
       </div>
    </div>
  )
}
