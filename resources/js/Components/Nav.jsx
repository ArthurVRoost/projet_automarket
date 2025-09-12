import { Link, router } from '@inertiajs/react'
import React from 'react'

export default function Nav ({auth, user}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        {auth.user ? (
    <div style={{padding: '10px', display: 'flex', alignItems: 'center'}}>
        <h3 style={{color: '#3468df'}}>AutoMarket</h3>
        <p>Catalogue</p>
        <p>Vendez votre voiture</p>
        <p>Administration</p>
        <button onClick={()=>router.post(route('logout'))}>Deco</button>
        
        
    </div>
) : (
    <div style={{padding: '10px', display: 'flex', alignItems: 'center', gap: '40px'}}>
        <h3 style={{color: '#3468df'}}>AutoMarket</h3>
        <p>Catalogue</p>
        <p>Vendez votre voiture</p>
        <p>Administration</p>
        <Link href={route('login')}>Login</Link>
        <Link href={route('register')}>Register</Link>
    </div>
)}
    </div>
  )
}                                           
