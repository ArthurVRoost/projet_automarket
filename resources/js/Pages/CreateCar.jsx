import { router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';


export default function CreateCar({ brands, fuels }) {
  const [form, setForm] = useState({
    brand_id: '',
    fuel_id: '',
    model: '',
    etat: 'neuf',
    annee: '',
    kilometrage: '',
    abs: false,
    image1_path: null,
    image2_path: null,
    image3_path: null,
    image4_path: null,
    jantes: '16',
    sellerie: 'Cuir',
    couleur: '#000000',
    type: '4X4',
    cylindree: '1l',
    prix: '',
    description: '',
  });

  const [showCylindree, setShowCylindree] = useState(true);

  useEffect(() => {
    const selectedFuel = fuels.find(f => f.id == form.fuel_id)?.fuel;
    setShowCylindree(selectedFuel !== 'Electrique');
    if (selectedFuel === 'Electrique') setForm(prev => ({ ...prev, cylindree: 'NONE' }));
  }, [form.fuel_id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') setForm({ ...form, [name]: checked });
    else if (type === 'file') setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach(key => {
      const value = form[key];
      if (typeof value === 'boolean') {
        formData.append(key, value ? 1 : 0);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    router.post(route('cars.store'), formData, {
      forceFormData: true,
      onSuccess: () => router.visit(route('homepage')),
      onError: (errors) => console.log('Erreurs :', errors),
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      method="POST" 
      encType="multipart/form-data" 
      className="create-car-form"
    >
      <label>Marque</label>
      <select name="brand_id" value={form.brand_id} onChange={handleChange} required>
        <option value="">Choisir une marque</option>
        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>

      <label>Carburant</label>
      <select name="fuel_id" value={form.fuel_id} onChange={handleChange} required>
        <option value="">Choisir un type de carburant</option>
        {fuels.map(f => <option key={f.id} value={f.id}>{f.fuel}</option>)}
      </select>

      <label>Modèle</label>
      <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="Modèle" required />

      <label>État</label>
      <select name="etat" value={form.etat} onChange={handleChange}>
        <option value="neuf">Neuf</option>
        <option value="occasion">Occasion</option>
      </select>

      <label>Année</label>
      <input type="number" name="annee" value={form.annee} onChange={handleChange} placeholder="Année" required />

      <label>Kilométrage</label>
      <input type="number" name="kilometrage" value={form.kilometrage} onChange={handleChange} placeholder="Kilométrage" required />

      <label><input type="checkbox" name="abs" checked={form.abs} onChange={handleChange} /> ABS</label>

      <label>Image principale</label>
      <input type="file" name="image1_path" onChange={handleChange} required />

      <label>Autres images</label>
      <input type="file" name="image2_path" onChange={handleChange} />
      <input type="file" name="image3_path" onChange={handleChange} />
      <input type="file" name="image4_path" onChange={handleChange} />

      <label>Jantes</label>
      <select name="jantes" value={form.jantes} onChange={handleChange}>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="NONE">NONE</option>
      </select>

      <label>Sellerie</label>
      <select name="sellerie" value={form.sellerie} onChange={handleChange}>
        <option value="Cuir">Cuir</option>
        <option value="Tissus">Tissus</option>
      </select>

      <label>Couleur</label>
      <input type="color" name="couleur" value={form.couleur} onChange={handleChange} />

      <label>Type</label>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="4X4">4X4</option>
        <option value="SUV">SUV</option>
        <option value="BREAK">BREAK</option>
        <option value="LUDOSPACE">LUDOSPACE</option>
        <option value="VAN">VAN</option>
        <option value="BERLINE">BERLINE</option>
      </select>

      {showCylindree && (
        <>
          <label>Cylindrée</label>
          <select name="cylindree" value={form.cylindree} onChange={handleChange}>
            <option value="1l">1l</option>
            <option value="1.2l">1.2l</option>
            <option value="1.5l">1.5l</option>
            <option value="1.8l">1.8l</option>
            <option value="2l">2l</option>
            <option value="3l">3l</option>
          </select>
        </>
      )}

      <label>Prix (€)</label>
      <input type="number" name="prix" value={form.prix} onChange={handleChange} placeholder="Prix" required />

      <label>Description</label>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />

      <button type="submit" className="submit-btn">
        Publier
      </button>
    </form> 
  );
}