import { Link, router } from '@inertiajs/react'
import React from 'react'

export default function Nav ({auth, user}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        {auth.user ? (
    <>
        <button onClick={()=>router.post(route('logout'))}>Deco</button>
        <p>{auth.user.role.name }</p>
        <img width={50} height={50} src={auth.user.image?.url  } alt="" />
    </>
) : (
    <>
        <Link href={route('login')}>Login</Link>
        <Link href={route('register')}>Register</Link>
    </>
)}
    </div>
  )
}                                           
