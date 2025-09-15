import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React from 'react'

export default function Home({auth, user, cars}) {
  return (
    <div>
      <Nav auth={auth} user={user}/>
      <div className='divHome'>
        <h1 style={{marginTop:'90px'}}>Trouvez votre véhicule idéal</h1>
        <p>Des millieurs d'annonces vérifiées à votre disposition</p>
        <input type="text" placeholder='Rechercher par marque, modèle...' className='inputHome' name="" id="" />
      </div>
      <div className="cars-container">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-badge">{car.brand?.name}</div>
            <img 
              src={`/${car.image1_path}`} 
              alt={car.model} 
              className="car-image"
            />
            <div className="car-content">
              <h3 className="car-title">
                {car.brand?.name} {car.model}
              </h3>
              <p className="car-price">
                {car.prix.toLocaleString()} €
              </p>
              <div className="car-info">
                <div>📅 {car.annee}</div>
                <div>⏱ {car.kilometrage.toLocaleString()} km</div>
                <div>⛽ {car.fuel?.fuel}</div>
                <div>📍 Schaerbeek 1030</div>
              </div>
              <button className="car-btn">Voir détails</button>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  )
}
