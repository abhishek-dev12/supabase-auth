import React, { useState } from 'react'
import supabase from './supabase';
import { Link, useNavigate } from 'react-router-dom';
// import HCaptcha from '@hcaptcha/react-hcaptcha'


export default function SIgnUp() {
    
      const navigate = useNavigate()
      const [Email,setEmail] =useState('')
      const [Name,setName] = useState('') 
      const [Password,setPassword] = useState('') 
      
      


      const CheckForBtn = () => {
        
        if(!Name || !Email || !Password){
           alert('please fill all the fields')
         }else{
            auth()
         }
         
      }
     
      const CheckName = (e) => {
       setName(e.target.value)
      }

      const CheckEmail = (e) => {
        setEmail(e.target.value)
       }

       const CheckPassword = (e) => {
        setPassword(e.target.value)
       }

   
   
    const auth = async () =>  {
  
      try{
  
       const {data, error} = await supabase.auth.signUp(
           
           {
              email: document.getElementById("email").value,
              password: document.getElementById('password').value,

        })
         

        if(error){
           if(error.message == "User already registered"){
            alert('user with this email is already exist')
           }else if(error.message == "Unable to validate email address: invalid format"){
            alert('please provide correct email address')
           }else if(error.message == "Password should be at least 6 characters."){
            alert('Password should be at least 6 characters.')
           }
        }
        
        
       const { err } = await supabase
            .from('profile')
           .insert({user_id: data.user.id ,Name: document.getElementById('name').value})

  if(err) throw err
 
        if(data.session) navigate("/")
             
      } catch(err){
         
      }

  } 

//  document.getElementById('regBtn').addEventListener('keydown', () => {
//    if ("Enter"){
//        console.log('enter key pressed')
//    }
//  })






 return (

      <div className='h-screen  flex justify-center items-center'>

   <div className='flex flex-col gap-4'>

        <div className='flex flex-col'>
            <label htmlFor="email" >Name</label> 
              <input type="text" className='border-2' id='name' value={Name} onChange={CheckName}/> 
        </div>

        <div className='flex flex-col'>

                <label htmlFor="email" >Email</label>
                <input type="text" className='border-2' id='email' value={Email} onChange={CheckEmail}/>
        </div>

          <div className='flex flex-col'>


          <label htmlFor="email">Password</label>
          <input type="password" className='border-2' id='password' value={Password} onChange={CheckPassword}/>

          </div>

          <div>
                <button className='w-full border-2 p-2 bg-black text-white' id="regBtn" onClick={CheckForBtn}  >Register</button>
          </div>

       <p className='text-red-500'> already have an account ? <Link to="/" className='text-blue-500 underline'>signin</Link></p>       
      
          </div>
       </div>
    )

  }