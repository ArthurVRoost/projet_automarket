import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React from 'react'

export default function Home({auth, user}) {
  return (
    <div>
      <Nav auth={auth} user={user}/>
      <div className='divHome'>
        <h1 style={{marginTop:'90px'}}>Trouvez votre véhicule idéal</h1>
        <p>Des millieurs d'annonces vérifiées à votre disposition</p>
        <input type="text" placeholder='Rechercher par marque, modèle...' className='inputHome' name="" id="" />
      </div>
      
      <Footer/>
    </div>
  )
}
