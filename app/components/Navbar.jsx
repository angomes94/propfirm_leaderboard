import Link from 'next/link'
import React from 'react'


export default function Navbar() {

  return (
    <div className=' w-full block text-right p-5'>
      <Link href={"/login"} className=' text-amber-400 duration-300 hover:scale-110 cursor-pointer'>Login</Link>
    </div>
  )
}
