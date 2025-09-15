import { Link, router } from '@inertiajs/react'
import React from 'react'
import { LuCar } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";
import '../../css/app.css'
export default function Nav ({auth, user}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      {auth.user ? (
        <div className='navDiv' >
          <h3 style={{color: '#3468df', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <LuCar /> AutoMarket
          </h3>
          <Link className='LinkNav' href={'/'} >Catalogue</Link>
          <Link className='LinkNav' href={route('cars.create')}><GoPlus /> Vendez votre voiture</Link>
          <Link className='LinkNav' href={'/admin'} ><GoGear/> Administration</Link>
          <button className='btnRegister' onClick={() => router.post(route('logout'))}>Déconnexion</button>
        </div>
      ) : (
        <div className='navDiv'>
          <h3 style={{color: '#3468df'}}><LuCar /> AutoMarket</h3>
          <Link className='LinkNav' href={'/'} >Catalogue</Link>
          <Link className='LinkNav' href={route('cars.create')}><GoPlus /> Vendez votre voiture</Link>
          {auth.user && auth.user.role_id === 3 && (
                <Link className='LinkNav' href={route('admin.index')}>
                    <GoGear/> Administration
                </Link>
            )}
          <div style={{display:'flex', gap: '15px'}}> 
            <Link href={route('login')}> <button className='btnLogin'>Connexion</button> </Link>
            <Link href={route('register')}> <button className='btnRegister'>Inscription</button> </Link>
          </div>
          
        </div>
      )}
    </div>
  )
}