import React, { useState } from 'react'
import supabase from './supabase';
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {

  const Navigate = useNavigate()
  const [Email,setEmail] =useState('')
  const [Password,setPassword] = useState('') 


  const CheckForSignInBtn = () => {
        
    if( !Email || !Password){
       alert('please fill all the fields')
     }else{
        SignIn()
     }
     
  }

 const CheckEmail = (e) => {
     setEmail(e.target.value)
    }

    const CheckPassword = (e) => {
     setPassword(e.target.value)
    }


   
       const SignIn = async () => {
            
        const {data, error} = await supabase.auth.signInWithPassword({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value 
            })

            if(data.session){
                Navigate('/welcomeuser')
            
          }else{
              alert('either email or password is wrong')
          
            }

       

       }

        
  return (
    <div className='h-screen w-full flex justify-center items-center '>
        <div className='flex flex-col gap-4'>

     <div className='flex flex-col '> 

        <label htmlFor="email " >Email</label>
          <input type="text" className='border-2' id='email' value={Email} onChange={CheckEmail}/>
     </div>

<div className=' flex flex-col '>
   
         <label htmlFor="password">Password</label>
         <input type="password" className='border-2' id='password' value={Password} onChange={CheckPassword}/>
</div>

   <div className=''>

        <button className='border-2 p-2 w-full bg-black text-white' onClick={CheckForSignInBtn} >signin  </button>
   </div>
        <p className='text-red-500'>Don't have an account ? <Link to={"/register"} className='text-blue-500 underline'>register here</Link></p>
        </div>
    </div>
  )
}
