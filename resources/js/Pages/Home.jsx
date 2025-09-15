import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Home({ auth, user, cars, brands, fuels }) {
  const [selectedBrand, setSelectedBrand] = useState('Tous')
  const [selectedFuel, setSelectedFuel] = useState('Tous')
  const handleDelete = (id) => {
    if (confirm("Tu veux vraiment supprimer?")) {
      router.delete(route('cars.destroy', id), {
        onSuccess: () => alert("Annonce del avec succes"),
        onError: () => alert("Erreur")
      })
    }
  }

  // Filtrage des voitures
  const filteredCars = cars.filter(car => {
    const brandMatch = selectedBrand === 'Tous' || car.brand?.name === selectedBrand
    const fuelMatch = selectedFuel === 'Tous' || car.fuel?.fuel === selectedFuel
    return brandMatch && fuelMatch
  })

  return (
    <div>
      <Nav auth={auth} user={user}/>
      <div className='divHome'>
        <h1 style={{marginTop:'90px'}}>Trouvez votre véhicule idéal</h1>
        <p>Des milliers d'annonces vérifiées à votre disposition</p>
        <input 
          type="text" 
          placeholder='Rechercher par marque, modèle...' 
          className='inputHome' 
        />
      </div>

      <div className="home-content" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Filtres */}
        <div className="filters" style={{ minWidth: '200px' }}>
          <h3>Filtrer par marque</h3>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} style={{ width: '100%', padding: '5px', marginBottom: '20px' }}>
            <option value="Tous">Tous</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
            ))}
          </select>

          <h3>Filtrer par carburant</h3>
          <div>
            <label>
              <input 
                type="radio" 
                value="Tous" 
                checked={selectedFuel === 'Tous'} 
                onChange={() => setSelectedFuel('Tous')} 
              /> Tous
            </label>
          </div>
          {fuels.map(fuel => (
            <div key={fuel.id}>
              <label>
                <input 
                  type="radio" 
                  value={fuel.fuel} 
                  checked={selectedFuel === fuel.fuel} 
                  onChange={() => setSelectedFuel(fuel.fuel)} 
                /> {fuel.fuel}
              </label>
            </div>
          ))}
        </div>

        {/* Cartes de voitures */}
       <div className="cars-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredCars.map((car) => (
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
              <Link href={route('cars.show', car.id)}>
                <button className="car-btn">Voir détails</button>
              </Link>

              {(auth.user?.role_id === 2 || auth.user?.role_id === 3) && (
                <button 
                  onClick={() => handleDelete(car.id)} 
                  style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', padding: '10px 15px', border:'none', borderRadius:'15px' }}
                >
                  Supprimer l'annonce
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>

      <Footer/>
    </div>
  )
}