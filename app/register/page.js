"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserAuth } from '../context/Authcontext';
import { ERROR } from '../utils/constants';

export default function page() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(false)

    const {checkIfUserExists, signup, currentUser} = UserAuth()

   
    useEffect(() => {
        if(currentUser){
            Router.push("/traderDashboard")
        }
    }, [])



    async function signupUser() {
        if (!email || !password || !userName) {
          return toast.warn(ERROR.TEXT_EMPTY);
        }
      
        try {
          setLoading(true);
          const userExists = await checkIfUserExists(email);
      
          if (userExists) {
            setLoading(false)
            return toast.error(ERROR.DUPLICATED_EMAIL);  
          }
      
          await signup(email, password, userName);
          Router.push("/traderDashboard");
        } catch (error) {
          setLoading(false)
          toast.error(ERROR.GENERAL_ERROR);
        }
      }
      

    return (

            <div className=' text-black px-5 flex w-full h-screen justify-center items-center'>
                <div className=' flex flex-col w-[40ch] '>
                <h1 className=' my-5 text-xl font-mono text-center'>Sing Up</h1>
                <p className='text-xs pb-2'>Username</p>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Enter your username'
                    className=' text-sm mb-5 outline-none duration-300 border-b-4 border-solid border-white focus:border-amber-400 text-slate-900 p-2 w-full max-w-[40ch]'></input>
                <p className='text-xs pb-2'>Email</p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='youremail@example.com'
                    className=' text-sm mb-5 outline-none duration-300 border-b-4 border-solid border-white focus:border-amber-400 text-slate-900 p-2 w-full max-w-[40ch]'></input>
                <p className=' text-xs pb-2'>Password</p>
                <input
                    value={password}
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    className=" text-sm outline-none duration-300 border-b-4 border-solid border-white focus:border-amber-400 text-slate-900 p-2 w-full max-w-[40ch]"></input>
                <div className='flex flex-col w-full justify-center items-center'>
                {loading ? <div className='flex justify-center max-w-[35ch]'><i className='text-5xl mt-2 text-center fa-solid duration-300 fa-spinner text-white animate-spin'/></div>
                      :
                <button onClick={signupUser} className=' rounded-xl mb-2 mt-5 py-2 px-10 bg-amber-400 duration-300 hover:ring-2 hover:ring-black'>Sing Up</button> }
                <Link className='underline text-xs' href="/login"> Login</Link>
                </div>
                <ToastContainer theme="colored"/>
                </div>
            </div>
        
    )
}