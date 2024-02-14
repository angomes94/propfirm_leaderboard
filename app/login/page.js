"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { UserAuth } from '../context/Authcontext';
import Router from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR } from '../utils/constants';


export default function page() { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

   
    const { login, currentUser } = UserAuth()

    useEffect(() => {
        if(currentUser){
            Router.push("/traderDashboard")
        }
    }, [])
    

    async function loginUser () {
        if(!email || !password){
            toast.warn(ERROR.TEXT_EMPTY)
        } else{
            try {
                setLoading(true)
                await login(email, password)
                Router.push('/traderDashboard')
            } catch (error) {
                toast.error(ERROR.INCORRECT_MAIL_PW)
                setLoading(false)
            }
            
        }
    }

    return (

       
            <div className=' text-black px-5 flex w-full h-screen justify-center items-center '>
                <div className=' flex flex-col w-[40ch] '>
                <h1 className=' my-5 text-xl font-mono text-center '>Login</h1>
                <p className='text-xs pb-2 '>Email</p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='youremail@example.com'
                    className=' text-sm mb-5 outline-none duration-300 border-b-4 border-solid border-white focus:border-amber-400 text-slate-900 p-2  '></input>
                <p className=' text-xs pb-2'>Password</p>
                <input
                    value={password}
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    className=" text-sm outline-none duration-300 border-b-4 border-solid border-white focus:border-amber-400 text-slate-900 p-2  "></input>
                <div className='flex flex-col w-full justify-center items-center'>
                 {loading ? <div className='flex justify-center'><i className='text-5xl mt-2 text-center fa-solid duration-300 fa-spinner text-white animate-spin'/></div>
                      :
                <button onClick={loginUser} className=' rounded-xl mb-2 mt-5 py-2 px-20 bg-amber-400 duration-300 hover:ring-2 hover:ring-black'>Login</button>}
                <p className='text-xs'>New User?
                    <Link className='underline' href="/register"> Register</Link>
                </p>
                </div>
                <ToastContainer theme="colored"/>
                </div>
            </div>
            
        
    )
}