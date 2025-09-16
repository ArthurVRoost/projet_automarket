import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';


export default function Show({ car, auth, user }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Paramètres du crédit
    const loanTerm = 60; // 60 mois
    const annualRate = 0.03; // 3%
    const monthlyRate = annualRate / 12;
    const initialDeposit = 9000;

    // Capital emprunté
    const loanAmount = car.prix - initialDeposit;

    // Formule de mensualité
    const monthlyPayment = loanAmount > 0 
        ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
        : 0;

    const images = [
        car.image1_path,
        car.image2_path,
        car.image3_path,
        car.image4_path
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price);
    };

    const getTransmissionText = () => {
        return 'Automatique'; // Vous pouvez ajouter ce champ à votre base de données
    };

    const getColorName = (hexColor) => {
        const colorMap = {
            '#000000': 'Noir métallisé',
            '#FFFFFF': 'Blanc',
            '#808080': 'Gris métallisé',
            '#1E90FF': 'Bleu',
            '#FF0000': 'Rouge',
            '#000080': 'Bleu marine',
            '#FFD700': 'Doré',
            '#00FF00': 'Vert',
            '#C0C0C0': 'Argent'
        };
        return colorMap[hexColor] || 'Couleur personnalisée';
    };

    return (
        <>
        <Nav auth={auth} user={user}/>
        <div className="show-container">
            {/* Header avec bouton retour */}
            <div className="header">
                <Link href={'/'} style={{textDecoration:'none'}}><button className="back-button"  >← Retour au catalogue</button></Link>
            </div>

            <div className="content-wrapper">
                {/* Section principale */}
                <div className="main-content">
                    {/* Carousel d'images */}
                    <div className="image-carousel">
                        <button className="carousel-btn prev" onClick={prevImage}>
                            ←
                        </button>
                        <img 
                            src={`/${images[currentImageIndex]}`} 
                            alt={`${car.brand.nom} ${car.model}`}
                            className="car-image2"
                        />
                        <button className="carousel-btn next" onClick={nextImage}>
                            →
                        </button>
                    </div>

                    {/* Informations principales du véhicule */}
                    <div className="car-main-info">
                        <div className="car-header">
                            <h1 className="car-title">{car.brand.nom} {car.model}</h1>
                            <div className="car-actions">
                                <button className="action-btn share">⚹</button>
                                <button className="action-btn favorite">♡</button>
                            </div>
                        </div>
                        
                        <div className="price">{formatPrice(car.prix)} €</div>
                        
                        <div className="car-specs">
                            <div className="spec-item">
                                <span className="spec-icon">📅</span>
                                <span>{car.annee}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-icon">🛣️</span>
                                <span>{formatPrice(car.kilometrage)} km</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-icon">⛽</span>
                                <span>{car.fuel.fuel}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-icon">⚙️</span>
                                <span>{getTransmissionText()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="description-section">
                        <h2>Description</h2>
                        <p>{car.description}</p>
                        
                        <div className="equipment-list">
                            <p>Équipements principaux:</p>
                            <ul>
                                <li>- Pack AMG Line extérieur et intérieur</li>
                                <li>- Système de navigation GPS avec écran 12.3"</li>
                                <li>- Sièges en cuir Nappa chauffants et ventilés</li>
                                <li>- Toit ouvrant panoramique</li>
                                <li>- Caméra de recul 360°</li>
                                <li>- Régulateur de vitesse adaptatif</li>
                                <li>- Phares LED Matrix</li>
                                <li>- Système audio Burmester</li>
                            </ul>
                        </div>
                        
                        <p><strong>Première main, non-fumeur. Disponible immédiatement.</strong></p>
                    </div>

                    {/* Caractéristiques */}
                    <div className="characteristics-section">
                        <h2>Caractéristiques</h2>
                        <div className="characteristics-grid">
                            <div className="char-row">
                                <span className="char-label">Moteur</span>
                                <span className="char-value">{car.cylindree}</span>
                                <span className="char-label">Puissance</span>
                                <span className="char-value">197ch</span>
                            </div>
                            <div className="char-row">
                                <span className="char-label">Couleur</span>
                                <span className="char-value">{getColorName(car.couleur)}</span>
                                <span className="char-label">Portes</span>
                                <span className="char-value">5</span>
                            </div>
                            <div className="char-row">
                                <span className="char-label">Places</span>
                                <span className="char-value">5</span>
                                <span className="char-label">Localisation</span>
                                <span className="char-value">Paris 16ème</span>
                            </div>
                        </div>
                    </div>

                    {/* Équipements */}
                    <div className="equipments-section">
                        <h2>Équipements</h2>
                        <div className="equipment-tags">
                            <div className="equipment-tag">
                                <span className="check">✓</span>
                                <span>GPS Navigation</span>
                            </div>
                            <div className="equipment-tag">
                                <span className="check">✓</span>
                                <span>Cuir Nappa</span>
                            </div>
                            <div className="equipment-tag">
                                <span className="check">✓</span>
                                <span>Toit panoramique</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar droite */}
                <div className="sidebar">
                    {/* Section vendeur */}
                    <div className="seller-section">
                        <h3>Vendeur</h3>
                        <div className="seller-name">{car.user.name}</div>
                        <div className="seller-location">📍 Paris 16ème</div>
                        <Link href={route('mail')}>
                        <button className="contact-btn">
                            ✉ Contacter le vendeur
                        </button>
                        </Link>
                        <div className="contact-note">
                            Connectez-vous pour contacter le vendeur
                        </div>
                    </div>

                    {/* Simulation de financement */}
                    <div className="financing-section">
                        <h3>💳 Simulation de financement</h3>
                        
                        <div className="financing-details">
                            <div className="financing-row">
                                <span>Prix du véhicule</span>
                                <span>TAEG</span>
                            </div>
                            <div className="financing-row values">
                                <span className="price-value">{formatPrice(car.prix)} €</span>
                                <span className="rate-value">3%</span>
                            </div>
                        </div>

                        <div className="monthly-payment">
                            <div className="payment-label">Mensualité</div>
                            <div className="payment-amount">{formatPrice(monthlyPayment.toFixed(2))} €</div>
                        </div>

                        <div className="financing-note">
                            Simulation indicative sur 60 mois avec 9 000 € d'apport initial
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
    );
}