import { Link, router } from '@inertiajs/react'
import React from 'react'
import { LuCar } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";

export default function Nav ({auth, user}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      {auth.user ? (
        <div style={{padding: '10px', display: 'flex', alignItems: 'center', gap: '20px'}}>
          <h3 style={{color: '#3468df', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <LuCar /> AutoMarket
          </h3>
          <p>Catalogue</p>
          <p style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <GoPlus /> Vendez votre voiture
          </p>
          <p style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <GoGear /> Administration
          </p>
          <button onClick={() => router.post(route('logout'))}>Déco</button>
        </div>
      ) : (
        <div style={{padding: '10px', display: 'flex', alignItems: 'center', gap: '40px'}}>
          <h3 style={{color: '#3468df'}}><LuCar /> AutoMarket</h3>
          <p>Catalogue</p>
          <p><GoPlus /> Vendez votre voiture</p>
          <p><GoGear /> Administration</p>
          <Link href={route('login')}>Login</Link>
          <Link href={route('register')}>Register</Link>
        </div>
      )}
    </div>
  )
}