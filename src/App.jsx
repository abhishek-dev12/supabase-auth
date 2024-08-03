import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css'
import SIgnUp from './SIgnUp';
import Logout from './Logout';
import Signin from './Signin';
// import Signin from './Signin';
import supabase from './supabase';

function App() {
  const Navi = useNavigate()

  const [isLoggedIn, setisLoggedIn] = useState(false)

    const UserLoggedIn = async () => {

       const { data, error } = await supabase.auth.getSession()
   
      
       if(data.session != null){

         setisLoggedIn(true)

       } else{

        setisLoggedIn(false)
        // console.log(error)
       } 

      }

   useEffect(() => {
    UserLoggedIn()
   },[UserLoggedIn])
   
   useEffect(() => {

    {isLoggedIn ?  ( Navi('/welcomeuser')) : ( Navi('/'))}

   }, [])
//    useEffect(() => {
      
//   Navi('/signin', {replace: true});
//    }, [Navi])

  return(
    <>
   
      
    
       <Routes>

            <Route  path='/register' element={<SIgnUp/>} />
            <Route  path='/'  element={<Signin/>}/>
            <Route  path='/welcomeuser' element={<Logout/>} />
          
          
                 
       </Routes>
       
</>
  
)
         
} 

export default App
