import { Link } from '@inertiajs/react';
import React from 'react'
import { LuCar } from "react-icons/lu";
import '../../css/app.css'
export default function Footer () {
  return (
    <>
      <div className='divFooter'>
        <div className='div1Footer'>
          <Link style={{textDecoration:"none", color:'white'}} className='div1FooterP'><LuCar/> Automarket</Link>
          <Link href={'/'} style={{textDecoration:"none", color:'white'}} className='div1FooterLink'>Catalogue</Link>
          <Link href={route('cars.create')} style={{textDecoration:"none", color:'white'}} className='div1FooterLink'>Vendez votre voiture</Link>
        </div>
      </div>
      <div className='div2Footer'>
            <p className='copyright'> Copyright &copy; - Arthur Van Roost 2025 </p>
        </div>
    </>

  )
}
